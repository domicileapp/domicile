package middleware

import (
	"fmt"
	"net/http"

	"github.com/domicileapp/domicile/api/pkg/helpers"
	"github.com/gin-gonic/gin"
)

// JWTAuthMiddleware handles validation of the JWT and returning StatusUnauthorized if not.
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		err := helpers.ValidateJWT(ctx)
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization required", "message": err})
			fmt.Println(err)
			ctx.Abort()
			return
		}
		ctx.Next()
	}
}
