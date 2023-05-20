package api

import (
	"net/http"
	"net/http/httptest"

	"github.com/gin-gonic/gin"
)

func GetTestGinContext() *gin.Context {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(w)
	ctx.Request = &http.Request{
		Header: make(http.Header),
	}

	return ctx
}

func MockJSONGet(c *gin.Context) {
	c.Request.Method = http.MethodGet
	c.Request.Header.Set("Content-Type", "application/json")
	c.Set("user_id", 1)

	// Set path params
	c.Params = []gin.Param{
		{
			Key:   "id",
			Value: "1",
		},
	}
}
