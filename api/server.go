package api

import (
	db "github.com/domicileapp/domicile/api/db/sqlc"
	"github.com/gin-gonic/gin"
)

type Server struct {
	store  *db.Store
	router *gin.Engine
}

func NewServer(store *db.Store) *Server {
	server := &Server{store: store}
	router := gin.Default()

	// TODO: Add routes

	server.router = router
	return server
}

func (server *Server) setupRouter() {
	router := gin.Default()
}
