package scraper

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewScraperClient_TrimsSlash(t *testing.T) {
	c := NewScraperClient("http://scraper:8000/", nil)
	assert.Equal(t, "http://scraper:8000", c.baseURL)
	require.NotNil(t, c.http)
}

func TestScrape_Validation(t *testing.T) {
	c := NewScraperClient("http://example.com", nil)

	tests := []struct {
		name    string
		url     string
		wantErr string
	}{
		{name: "empty url", url: "", wantErr: "url is required"},
		{name: "invalid url", url: "://bad", wantErr: "invalid url"},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			_, err := c.Scrape(context.Background(), tc.url, "<html>")
			require.Error(t, err)
			assert.Contains(t, err.Error(), tc.wantErr)
		})
	}
}

func TestScrape(t *testing.T) {
	tests := []struct {
		name           string
		handler        http.HandlerFunc
		url            string
		wantTitle      string
		wantSource     string
		wantErr        string
		wantScraperErr bool
	}{
		{
			name: "success",
			handler: func(w http.ResponseWriter, r *http.Request) {
				assert.Equal(t, http.MethodPost, r.Method)
				assert.Equal(t, "/scrape", r.URL.Path)
				assert.Equal(t, "application/json", r.Header.Get("Content-Type"))
				var req scrapeRequest
				require.NoError(t, json.NewDecoder(r.Body).Decode(&req))
				_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: &Recipe{Title: "T", Description: "D", SourceURL: "https://example.com"}})
			},
			url:       "https://example.com",
			wantTitle: "T",
		},
		{
			name: "source url fallback",
			handler: func(w http.ResponseWriter, r *http.Request) {
				_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: &Recipe{Title: "T", SourceURL: ""}})
			},
			url:        "https://example.com/page",
			wantSource: "https://example.com/page",
			wantTitle:  "T",
		},
		{
			name: "scraper error",
			handler: func(w http.ResponseWriter, r *http.Request) {
				_ = json.NewEncoder(w).Encode(scrapeResponse{Error: "no recipe found"})
			},
			url:            "https://example.com",
			wantErr:        "no recipe found",
			wantScraperErr: true,
		},
		{
			name: "nil recipe",
			handler: func(w http.ResponseWriter, r *http.Request) {
				_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: nil})
			},
			url:            "https://example.com",
			wantErr:        "no recipe",
			wantScraperErr: true,
		},
		{
			name: "missing title",
			handler: func(w http.ResponseWriter, r *http.Request) {
				_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: &Recipe{Title: "", SourceURL: "https://example.com"}})
			},
			url:            "https://example.com",
			wantErr:        "missing a title",
			wantScraperErr: true,
		},
		{
			name: "non 200",
			handler: func(w http.ResponseWriter, r *http.Request) {
				w.WriteHeader(http.StatusInternalServerError)
				_, _ = w.Write([]byte("boom"))
			},
			url:     "https://example.com",
			wantErr: "HTTP 500",
		},
		{
			name: "bad json",
			handler: func(w http.ResponseWriter, r *http.Request) {
				_, _ = w.Write([]byte("{bad json"))
			},
			url:     "https://example.com",
			wantErr: "decode",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			srv := httptest.NewServer(http.HandlerFunc(tc.handler))
			defer srv.Close()

			c := NewScraperClient(srv.URL, srv.Client())
			got, err := c.Scrape(context.Background(), tc.url, "<html>")

			if tc.wantErr != "" {
				require.Error(t, err)
				assert.Contains(t, err.Error(), tc.wantErr)
				if tc.wantScraperErr {
					var se *ScraperError
					assert.True(t, errors.As(err, &se), "expected ScraperError")
				}
				return
			}

			require.NoError(t, err)
			if tc.wantTitle != "" {
				assert.Equal(t, tc.wantTitle, got.Title)
			}
			if tc.wantSource != "" {
				assert.Equal(t, tc.wantSource, got.SourceURL)
			}
		})
	}
}

func TestScrape_ContextCanceled(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: &Recipe{Title: "T"}})
	}))
	defer srv.Close()

	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	c := NewScraperClient(srv.URL, srv.Client())
	_, err := c.Scrape(ctx, "https://example.com", "<html>")
	require.Error(t, err)
}

func TestScrape_CloseErrorLogged(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_ = json.NewEncoder(w).Encode(scrapeResponse{Recipe: &Recipe{Title: "T", SourceURL: "https://example.com"}})
	}))
	defer srv.Close()

	c := NewScraperClient(srv.URL, srv.Client())
	orig := c.http
	c.http = &http.Client{
		Transport: roundTripFunc(func(r *http.Request) (*http.Response, error) {
			resp, err := orig.Transport.RoundTrip(r)
			if err != nil {
				return nil, err
			}
			resp.Body = &closeErrReadCloser{ReadCloser: resp.Body}
			return resp, err
		}),
	}
	if c.http.Transport == nil {
		c.http.Transport = roundTripFunc(func(r *http.Request) (*http.Response, error) {
			resp, err := http.DefaultTransport.RoundTrip(r)
			if err != nil {
				return nil, err
			}
			resp.Body = &closeErrReadCloser{ReadCloser: resp.Body}
			return resp, err
		})
	}

	_, err := c.Scrape(context.Background(), "https://example.com", "<html>")
	require.NoError(t, err)
}

func TestScraperError_Error(t *testing.T) {
	err := &ScraperError{Message: "oops"}
	assert.Equal(t, "scraper: oops", err.Error())
}

type roundTripFunc func(*http.Request) (*http.Response, error)

func (f roundTripFunc) RoundTrip(r *http.Request) (*http.Response, error) { return f(r) }

type closeErrReadCloser struct {
	io.ReadCloser
}

func (c *closeErrReadCloser) Close() error { return errors.New("close boom") }
