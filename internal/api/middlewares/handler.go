package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// NoMethodHandler handles the case where a method doesn't exist
func NoMethodHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusMethodNotAllowed, gin.H{"message": "Method not permitted"})
	}
}

// NoRouteHandler handles the case where a function doesn't exist to handle a request route
func NoRouteHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "The processing function of the request route was not found",
		})
	}
}
