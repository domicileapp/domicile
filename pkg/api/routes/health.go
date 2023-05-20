package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// AddHealthRoutes creates the /health routes
func AddHealthRoutes(rg *gin.RouterGroup) {
	health := rg.Group("/health")

	// swagger:route GET /ping health ping
	// Consumes:
	// - application/json
	// Schemas: http, https
	health.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "hello",
		})
	})
}
