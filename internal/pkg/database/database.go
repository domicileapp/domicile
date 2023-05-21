package database

import (
	"fmt"

	"github.com/domicileapp/domicile/api/internal/pkg/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// DB is the database instance
var DB *gorm.DB

// SetupDB opens a database connection and saves a reference
func SetupDB() {
	configuration := config.GetConfig()

	database := configuration.Database.DatabaseName
	host := configuration.Database.Host
	port := configuration.Database.Port
	username := configuration.Database.Username
	password := configuration.Database.Password

	dsn := fmt.Sprintf(
		"host=%v user=%v password=%v dbname=%v port=%v sslmode=disable",
		host, username, password, database, port,
	)
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err = DB.Error; err != nil {
		panic(err)
	}
}
