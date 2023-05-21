package controllers

import (
	"net/http"

	"github.com/domicileapp/domicile/api/internal/pkg/config"
	"github.com/domicileapp/domicile/api/pkg/models"
	"github.com/gin-gonic/gin"
)

// GetVersion controller
func GetVersion(c *gin.Context) {
	info := models.AppInfo{
		Version:  config.Version,
		Deployed: config.BuildTime,
	}
	c.JSON(http.StatusOK, info)
}
