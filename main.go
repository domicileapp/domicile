package main

import (
	"log"

	"github.com/domicileapp/domicile/api/pkg/database"
	"github.com/domicileapp/domicile/api/pkg/handlers"
	"github.com/domicileapp/domicile/api/pkg/middleware"
	"github.com/domicileapp/domicile/api/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDatabase()
	setupRoutes()
}

func loadEnv() {
	err := godotenv.Load(".env.local")
	if err != nil {
		log.Fatalf("Error loading env file: %v", err)
	}
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&models.User{})
	database.Database.AutoMigrate(&models.Recipe{})
}

func setupRoutes() {
	router := gin.Default()

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", handlers.CreateUser)
	publicRoutes.POST("/login", handlers.Login)

	protectedRoutes := router.Group("/v1")
	protectedRoutes.Use(middleware.JWTAuthMiddleware())
	protectedRoutes.GET("/recipes", handlers.GetRecipes)

	router.Run("localhost:8000")
}
