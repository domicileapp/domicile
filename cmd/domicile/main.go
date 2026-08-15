package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/domicileapp/domicile/docs"
	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/recipes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

type App struct {
	Router *chi.Mux
	DB     *db.Queries
}

//	@title		Domicile API
//	@version	0.1

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

	r.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"),
	))

	// Register all the routes
	r.Mount("/api/v1/recipes", recipes.Routes(queries))

	log.Println("Domicile service starting on http://localhost:8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
