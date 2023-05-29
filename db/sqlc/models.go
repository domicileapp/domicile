// Code generated by sqlc. DO NOT EDIT.

package db

import (
	"database/sql"
	"time"
)

type Recipe struct {
	ID           int64
	CreatedAt    time.Time
	UpdatedAt    sql.NullTime
	Title        string
	Description  sql.NullString
	Instructions string
	Ingredients  string
	Source       sql.NullString
	CreatorID    sql.NullInt64
}

type User struct {
	ID        int64
	CreatedAt time.Time
	UpdatedAt sql.NullTime
	FirstName string
	LastName  string
	Username  string
	Password  string
	Recipes   sql.NullInt64
}
