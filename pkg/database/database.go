package database

import (
	"fmt"

	"github.com/domicileapp/domicile/api/pkg/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// SetupDatabase create the database, run migrations
func SetupDatabase() {
	fmt.Println("Connecting to database")
	db, err := gorm.Open(sqlite.Open("domicile_dev.db"), &gorm.Config{})
	if err == nil {
		fmt.Println("Connected to database")
	}
	if err != nil {
		panic("Failed to connect/create database")
	}

	// Migrate the schema
	db.AutoMigrate(
		&models.Recipe{},
		&models.User{},
	)
}
