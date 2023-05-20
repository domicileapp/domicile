package main

import (
	"github.com/domicileapp/domicile/api/pkg/api"
	"github.com/domicileapp/domicile/api/pkg/database"
	"github.com/gin-gonic/gin"
)

//	@title	        Swagger Example API
//	@version		1.0
//	@description	This is a sample server Petstore server.
//	@termsOfService	http://swagger.io/terms/

//	@contact.name	API Support
//	@contact.url	http://www.swagger.io/support
//	@contact.email	support@swagger.io

//	@license.name	Apache 2.0
//	@license.url	http://www.apache.org/licenses/LICENSE-2.0.html

// @host		petstore.swagger.io
// @BasePath    /v1
func main() {
	database.SetupDatabase()
	api.SetupRoutes()
	gin.SetMode(gin.DebugMode)
}
