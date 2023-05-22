package helpers

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/domicileapp/domicile/api/pkg/models"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
)

func SetupTestGinContext() *gin.Context {
	gin.SetMode(gin.TestMode)

	w := httptest.NewRecorder()
	ctx, _ := gin.CreateTestContext(w)
	ctx.Request = &http.Request{
		Header: make(http.Header),
	}

	return ctx
}

func TestGenerateJWT(t *testing.T) {
	user := models.User{
		Username: "test",
		Password: "test",
	}
	require.NoError(t, err)

	username := "testuser"
	duration := time.Minute

	issuedAt := time.Now()
	expiredAt := issuedAt.Add(duration)

	token, err := GenerateJWT(user)
	require.NoError(t, err)
	require.NotEmpty(t, token)

	payload := ValidateJWT(token)
}

func TestValidateJWT(t *testing.T) {
	invalidToken := "invalidtoken"
	// validToken := "validToken"

	c := SetupTestGinContext()
	c.Request.Header.Add("Authorization", invalidToken)

	err := ValidateJWT(c)
	if err != nil {
		t.Fatalf("Test failed: %v", err)
	}
}
