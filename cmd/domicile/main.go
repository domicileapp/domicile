package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/recipes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
)

type App struct {
	Router *chi.Mux
	DB     *db.Queries
}

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
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Register all the routes
	r.Mount("/api/v1/recipes", recipes.Routes(queries))

	log.Println("Domicile service starting on http://localhost:8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
