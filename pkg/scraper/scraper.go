package scraper

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type Recipe struct {
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Images      []string `json:"images"`
	Authors     []string `json:"authors"`
	Ingredients []string `json:"ingredients"`
	Steps       []string `json:"steps"`
	SourceURL   string   `json:"source_url"`
	Servings    string   `json:"servings"`
	PrepTime    string   `json:"prep_time"`
	CookTime    string   `json:"cook_time"`
	Notes       string   `json:"notes"`
	Nutrition   string   `json:"nutrition"`
}

type Scraper interface {
	Scrape(ctx context.Context, pageURL, html string) (*Recipe, error)
}

type ScraperClient struct {
	baseURL string
	http    *http.Client
}

func NewScraperClient(baseURL string, httpClient *http.Client) *ScraperClient {
	if httpClient == nil {
		httpClient = &http.Client{Timeout: 30 * time.Second}
	}
	return &ScraperClient{baseURL: strings.TrimRight(baseURL, "/"), http: httpClient}
}

type scrapeRequest struct {
	URL  string `json:"url"`
	HTML string `json:"html"`
}

type scrapeResponse struct {
	Recipe *Recipe `json:"recipe,omitempty"`
	Error  string  `json:"error,omitempty"`
}

func (c *ScraperClient) Scrape(ctx context.Context, pageURL, html string) (*Recipe, error) {
	if pageURL == "" {
		return nil, fmt.Errorf("scraper: url is required")
	}
	if _, err := url.Parse(pageURL); err != nil {
		return nil, fmt.Errorf("scraper: invalid url: %w", err)
	}

	body, err := json.Marshal(scrapeRequest{URL: pageURL, HTML: html})
	if err != nil {
		return nil, fmt.Errorf("scraper: marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.baseURL+"/scrape", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("scraper: build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	resp, err := c.http.Do(req)
	if err != nil {
		return nil, fmt.Errorf("scraper: call sidecar: %w", err)
	}
	defer func() {
		if cerr := resp.Body.Close(); cerr != nil {
			slog.Error("scraper: failed to close sidecar response body", "error", cerr)
		}
	}()

	raw, err := io.ReadAll(io.LimitReader(resp.Body, 2<<20))
	if err != nil {
		return nil, fmt.Errorf("scraper: read sidecar response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("scraper: sidecar returned HTTP %d: %s", resp.StatusCode, string(raw))
	}

	var decoded scrapeResponse
	if err := json.Unmarshal(raw, &decoded); err != nil {
		return nil, fmt.Errorf("scraper: decode sidecar response: %w", err)
	}

	if decoded.Error != "" {
		return nil, &SidecarError{Message: decoded.Error}
	}
	if decoded.Recipe == nil {
		return nil, &SidecarError{Message: "sidecar returned no recipe"}
	}
	if decoded.Recipe.Title == "" {
		return nil, &SidecarError{Message: "scraped recipe is missing a title"}
	}
	if decoded.Recipe.SourceURL == "" {
		decoded.Recipe.SourceURL = pageURL
	}

	return decoded.Recipe, nil
}

type SidecarError struct {
	Message string
}

func (e *SidecarError) Error() string { return "scraper: " + e.Message }
