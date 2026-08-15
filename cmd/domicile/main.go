package main

import (
	"log"
	"net/http"

	"github.com/domicileapp/domicile/recipes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Heartbeat("/"))

	recipes.RegisterRoutes(r)

	err := http.ListenAndServe(":3000", r)
	if err != nil {
		log.Println(err.Error())
	}
}
