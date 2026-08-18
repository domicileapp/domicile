package recipes

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestDefaultIfEmpty(t *testing.T) {
	t.Run("string - empty falls back to default", func(t *testing.T) {
		got := defaultIfEmpty("", "desc")
		if got != "desc" {
			t.Fatalf("expected %q, got %q", "desc", got)
		}
	})

	t.Run("string - non-empty is returned as-is", func(t *testing.T) {
		got := defaultIfEmpty("asc", "desc")
		if got != "asc" {
			t.Fatalf("expected %q, got %q", "asc", got)
		}
	})

	t.Run("int - zero falls back to default", func(t *testing.T) {
		got := defaultIfEmpty(0, 12)
		if got != 12 {
			t.Fatalf("expected %d, got %d", 12, got)
		}
	})

	t.Run("int - non-zero is returned as-is", func(t *testing.T) {
		got := defaultIfEmpty(5, 12)
		if got != 5 {
			t.Fatalf("expected %d, got %d", 5, got)
		}
	})
}

func TestParseIDParam(t *testing.T) {
	cases := []struct {
		name    string
		idValue string
		wantID  int64
		wantErr bool
	}{
		{name: "valid id", idValue: "42", wantID: 42},
		{name: "zero id", idValue: "0", wantID: 0},
		{name: "non-numeric id", idValue: "abc", wantErr: true},
		{name: "negative id", idValue: "-7", wantID: -7},
		{name: "decimal id", idValue: "4.5", wantErr: true},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			var gotID int64
			var gotErr error

			r := chi.NewRouter()
			r.Get("/{id}", func(w http.ResponseWriter, req *http.Request) {
				gotID, gotErr = parseIDParam(req, "id")
				w.WriteHeader(http.StatusOK)
			})

			req := httptest.NewRequest(http.MethodGet, "/"+tc.idValue, nil)
			rec := httptest.NewRecorder()
			r.ServeHTTP(rec, req)

			if tc.wantErr {
				if gotErr == nil {
					t.Fatalf("expected error, got nil (id=%d)", gotID)
				}
				return
			}

			if gotErr != nil {
				t.Fatalf("unexpected error: %v", gotErr)
			}
			if gotID != tc.wantID {
				t.Fatalf("expected id=%d, got %d", tc.wantID, gotID)
			}
		})
	}
}

func TestParseIntParam(t *testing.T) {
	cases := []struct {
		name       string
		query      string
		key        string
		defaultVal int32
		wantVal    int32
		wantErr    bool
	}{
		{name: "missing param uses default", query: "", key: "page", defaultVal: 1, wantVal: 1},
		{name: "valid value overrides default", query: "page=5", key: "page", defaultVal: 1, wantVal: 5},
		{name: "zero value is valid", query: "page=0", key: "page", defaultVal: 1, wantVal: 0},
		{name: "negative value parses", query: "page=-3", key: "page", defaultVal: 1, wantVal: -3},
		{name: "non-numeric value errors", query: "page=abc", key: "page", defaultVal: 1, wantErr: true},
		{name: "decimal value errors", query: "page=1.5", key: "page", defaultVal: 1, wantErr: true},
		{name: "value exceeding int32 errors", query: "page=99999999999", key: "page", defaultVal: 1, wantErr: true},
		{name: "empty string value uses default", query: "page=", key: "page", defaultVal: 1, wantVal: 1},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/?"+tc.query, nil)

			got, err := parseIntParam(req, tc.key, tc.defaultVal)

			if tc.wantErr {
				if err == nil {
					t.Fatalf("expected error, got nil (val=%d)", got)
				}
				return
			}

			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got != tc.wantVal {
				t.Fatalf("expected %d, got %d", tc.wantVal, got)
			}
		})
	}
}

func TestParseListRecipesParams(t *testing.T) {
	cases := []struct {
		name    string
		query   string
		want    listRecipesParams
		wantErr string
	}{
		{
			name:  "all defaults",
			query: "",
			want: listRecipesParams{
				search:    "",
				page:      1,
				size:      12,
				sort:      "updated_at",
				direction: "desc",
			},
		},
		{
			name:  "explicit values",
			query: "search=chili&page=2&size=25&sort=name&direction=asc",
			want: listRecipesParams{
				search:    "chili",
				page:      2,
				size:      25,
				sort:      "name",
				direction: "asc",
			},
		},
		{
			name:    "invalid page - non-numeric",
			query:   "page=abc",
			wantErr: "page must be a valid integer",
		},
		{
			name:    "invalid size - non-numeric",
			query:   "size=abc",
			wantErr: "size must be a valid integer",
		},
		{
			name:    "page below minimum",
			query:   "page=0",
			wantErr: "page must be greater than 0",
		},
		{
			name:    "page negative",
			query:   "page=-1",
			wantErr: "page must be greater than 0",
		},
		{
			name:    "size below minimum",
			query:   "size=0",
			wantErr: "size must be between 1 and 120",
		},
		{
			name:    "size above maximum",
			query:   "size=121",
			wantErr: "size must be between 1 and 120",
		},
		{
			name:  "size at maximum boundary",
			query: "size=120",
			want: listRecipesParams{
				page:      1,
				size:      120,
				sort:      "updated_at",
				direction: "desc",
			},
		},
		{
			name:  "size at minimum boundary",
			query: "size=1",
			want: listRecipesParams{
				page:      1,
				size:      1,
				sort:      "updated_at",
				direction: "desc",
			},
		},
		{
			name:    "invalid direction",
			query:   "direction=sideways",
			wantErr: "direction must be either 'asc' or 'desc'",
		},
		{
			name:    "invalid sort",
			query:   "sort=yomama",
			wantErr: "sort must be one of: name, created_at, updated_at, id",
		},
		{
			name:  "sort - created_at is valid",
			query: "sort=created_at",
			want: listRecipesParams{
				page:      1,
				size:      12,
				sort:      "created_at",
				direction: "desc",
			},
		},
		{
			name:  "sort - id is valid",
			query: "sort=id",
			want: listRecipesParams{
				page:      1,
				size:      12,
				sort:      "id",
				direction: "desc",
			},
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, "/?"+tc.query, nil)

			got, err := parseListRecipesParams(req)

			if tc.wantErr != "" {
				if err == nil {
					t.Fatalf("expected error %q, got nil", tc.wantErr)
				}
				if err.Error() != tc.wantErr {
					t.Fatalf("expected error %q, got %q", tc.wantErr, err.Error())
				}
				return
			}

			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}
			if got != tc.want {
				t.Fatalf("expected %+v, got %+v", tc.want, got)
			}
		})
	}
}
