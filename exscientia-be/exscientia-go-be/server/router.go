package server

import (
	"exscientia-go-be/config"
	"net/http"

	"github.com/gorilla/mux"
)

func newRouter(cfg *config.Config) http.Handler {
	router := mux.NewRouter()
	router.HandleFunc("/compounds", compoundsHandler(cfg))
	return router
}
