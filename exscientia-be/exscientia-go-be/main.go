package main

import (
	"exscientia-go-be/config"
	"exscientia-go-be/server"
	"fmt"
)

func main() {

	// init app config
	cfg, err := config.NewConfig()
	if err != nil {
		fmt.Printf("Could not initialise config with error: %v", err)
		return
	}

	// prevent memory leaks
	defer cfg.DBClient.Cleanup()

	srv := server.NewServer(cfg)

	cfg.Logger.Info().Msgf("Listening on %s:%s", cfg.ServerHost, cfg.ServerPort)
	if err := srv.ListenAndServe(); err != nil {
		cfg.Logger.Fatal().Msgf("Server shutdown with error: %v", err)
	}
}
