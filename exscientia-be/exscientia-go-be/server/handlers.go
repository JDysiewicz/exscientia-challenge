package server

import (
	"encoding/json"
	"exscientia-go-be/config"
	"net/http"
)

func compoundsHandler(cfg *config.Config) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		// allow CORS here for front-end interaction.
		// would need to specify hosts rather than '*' to limit attack surface area.
		w.Header().Set("Access-Control-Allow-Origin", "*")

		compounds, err := cfg.DBClient.GetAllCompounds()
		if err != nil {
			cfg.Logger.Error().Msgf("Failed to GetAllCompounds with error: %v", err)
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte("Error"))
			return
		}

		// return JSON
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(compounds)
	}
}
