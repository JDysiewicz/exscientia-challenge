/*
	server package contains all code necessary for setting up the API
	(e.g. handlers, router, etc).
*/
package server

import (
	"exscientia-go-be/config"
	"exscientia-go-be/utils"
	"net/http"
	"time"
)

func NewServer(cfg *config.Config) *http.Server {

	router := newRouter(cfg)

	srv := &http.Server{
		Addr:         utils.BuildAddr(cfg.ServerHost, cfg.ServerPort),
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		Handler:      router,
	}

	return srv
}
