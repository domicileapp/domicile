package models

import "gorm.io/gorm"

// Recipe represents recipe data
type Recipe struct {
	*gorm.Model
	Title       string
	Description string
	Draft       bool
}
