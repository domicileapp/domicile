package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"

	_ "github.com/domicileapp/domicile/docs"
	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/internal/recipes"
	"github.com/domicileapp/domicile/pkg/logger"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httplog/v3"
	"github.com/jackc/pgx/v5/pgxpool"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

type App struct {
	Router *chi.Mux
	DB     *db.Queries
}

//	@title			Domicile API
//	@description	Domicile's REST API
//	@version		0.1

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dbString := os.Getenv("GOOSE_DBSTRING")
	if dbString == "" {
		log.Fatal("GOOSE_DBSTRING environment variable is not set")
	}

	pool, err := pgxpool.New(ctx, dbString)
	if err != nil {
		log.Fatalf("Unable to connect to database pool: %v", err)
	}
	defer pool.Close()

	if err := pool.Ping(ctx); err != nil {
		log.Fatalf("Database ping failed: %v", err)
	}

	queries := db.New(pool)

	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(middleware.Heartbeat("/"))

	log, logFormat := logger.SetupLogging()

	r.Use(httplog.RequestLogger(log, &httplog.Options{
		Level:           slog.LevelDebug,
		Schema:          logFormat,
		RecoverPanics:   true,
		LogRequestBody:  logger.IsDebugHeaderSet,
		LogResponseBody: logger.IsDebugHeaderSet,
	}))

	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			// httplog.SetAttrs(ctx, slog.String("user", "user1"))
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	})

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"http://*", "https://*"},
	}))

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"),
	))

	// Register all the routes
	r.Mount("/api/v1/recipes", recipes.Routes(recipes.NewSQLCStore(queries)))

	log.Info("Domicile service starting", "url", "http://localhost:8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Error("Server failed to start", "error", err.Error())
	}
}
