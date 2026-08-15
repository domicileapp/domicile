package recipes

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/response"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
)

func RegisterRoutes(r chi.Router) {
	recipesRouter := chi.NewRouter()
	recipesRouter.Get("/", get)

	r.Mount("/recipes", recipesRouter)
}

func get(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	dbString := os.Getenv("GOOSE_DBSTRING")
	conn, err := pgx.Connect(ctx, dbString)
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close(ctx)

	q := db.New(conn)
	recipes, err := q.ListRecipes(r.Context())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	response.RespondWithJSON(w, 200, recipes)
}
