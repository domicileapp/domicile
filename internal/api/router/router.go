package router

import (
	"fmt"
	"io"
	"os"

	// Required to generate swagger docs
	_ "github.com/domicileapp/domicile/api/docs"
	"github.com/domicileapp/domicile/api/internal/api/controllers"
	"github.com/domicileapp/domicile/api/internal/api/middlewares"
	"github.com/domicileapp/domicile/api/internal/pkg/config"
	"github.com/domicileapp/domicile/api/pkg/logger"

	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func Setup() *gin.Engine {
	configuration := config.GetConfig()

	if err := logger.InitLogger(&configuration.LogConfig); err != nil {
		fmt.Printf("init logger failed, err:%v\n", err)
		return nil
	}

	app := gin.New()

	// Logging to a file.
	f, _ := os.Create("log/api.log")
	gin.DisableConsoleColor()
	gin.DefaultWriter = io.MultiWriter(f)

	// Middlewares
	app.Use(requestid.New())
	app.Use(logger.GinLogger(), logger.GinRecovery(true))
	app.Use(gin.Recovery())
	app.Use(middlewares.CORS())
	app.NoRoute(middlewares.NoRouteHandler())

	v1 := app.Group("/v1")

	// Routes
	app.GET("/isActive", controllers.GetVersion)
	// app.GET("/actions", controllers.GetActions)
	// app.POST("/command", controllers.PostAction)

	// Swagger Endpoint
	v1.GET("/api-docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	return app
}
