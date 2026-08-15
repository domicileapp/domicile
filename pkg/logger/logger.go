package logger

import (
	"log/slog"
	"net/http"
	"os"

	"github.com/go-chi/httplog/v3"
	"github.com/lmittmann/tint"
)

func IsDebugHeaderSet(r *http.Request) bool {
	return r.Header.Get("Debug") == "reveal-body-logs"
}

func SetupLogging() (*slog.Logger, *httplog.Schema) {
	logFormat := httplog.SchemaECS.Concise(true)

	logger := slog.New(tint.NewTextHandler(os.Stdout, &tint.Options{
		ReplaceAttr: logFormat.ReplaceAttr,
	}))

	return logger, logFormat
	// .With(slog.)
}
