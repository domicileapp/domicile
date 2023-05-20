package api

import (
	// This is required for docgen to work
	"github.com/domicileapp/domicile/api/docs"
	"github.com/domicileapp/domicile/api/pkg/api/routes"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var router = gin.Default()

// SetupRoutes creates the API routes
func SetupRoutes() {
	v1 := router.Group("/v1")
	docs.SwaggerInfo.Title = "Program"
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	routes.AddHealthRoutes(v1)
	router.Run("localhost:3000")
}
