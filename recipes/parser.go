package recipes

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

// v is the value
// d is the default
func defaultIfEmpty[T comparable](v, d T) T {
	var zero T
	if v == zero {
		return d
	}
	return v
}

func parseIDParam(r *http.Request, key string) (int64, error) {
	return strconv.ParseInt(chi.URLParam(r, key), 10, 64)
}

func parseIntParam(r *http.Request, key string, defaultVal int32) (int32, error) {
	valStr := r.URL.Query().Get(key)
	if valStr == "" {
		return defaultVal, nil
	}

	val, err := strconv.ParseInt(valStr, 10, 32)
	if err != nil {
		return 0, err
	}

	return int32(val), nil
}

type listRecipesParams struct {
	search    string
	page      int32
	size      int32
	sort      string
	direction string
}

var validSortFields = map[string]bool{
	"name":       true,
	"created_at": true,
	"updated_at": true,
	"id":         true,
}

func parseListRecipesParams(r *http.Request) (listRecipesParams, error) {
	p := listRecipesParams{
		search:    r.URL.Query().Get("search"),
		direction: defaultIfEmpty(r.URL.Query().Get("direction"), "desc"),
		sort:      defaultIfEmpty(r.URL.Query().Get("sort"), "updated_at"),
	}

	var err error

	if p.page, err = parseIntParam(r, "page", 1); err != nil {
		return p, fmt.Errorf("page must be a valid integer")
	}
	if p.size, err = parseIntParam(r, "size", 12); err != nil {
		return p, fmt.Errorf("size must be a valid integer")
	}

	if p.page < 1 {
		return p, fmt.Errorf("page must be greater than 0")
	}
	if p.size < 1 || p.size > 120 {
		return p, fmt.Errorf("size must be between 1 and 120")
	}
	if p.direction != "asc" && p.direction != "desc" {
		return p, fmt.Errorf("direction must be either 'asc' or 'desc'")
	}
	if !validSortFields[p.sort] {
		return p, fmt.Errorf("sort must be one of: name, created_at, updated_at, id")
	}

	return p, nil
}
