package routes

import (
	"net/http"
	"testing"

	"github.com/domicileapp/domicile/api/pkg/api"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestHealthPingRoute(t *testing.T, c *gin.Context) {
	r := api.SetupRoutes()
	r.GET("/")

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, gin.H{
		"message": "hello",
	}, w.Body.String())
}
