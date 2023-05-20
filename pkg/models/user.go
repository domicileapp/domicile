package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a user
// swagger:model
type User struct {
	gorm.Model
	// id for the user
	// required: true
	ID        int `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	FirstName string
	LastName  string
	Username  string
}
