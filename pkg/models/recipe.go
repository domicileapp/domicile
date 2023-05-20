package models

import (
	"time"

	"gorm.io/gorm"
)

// Recipe model
type Recipe struct {
	gorm.Model
	ID          int `gorm:"primaryKey"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Title       string
	Description string
}
