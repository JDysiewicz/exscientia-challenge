/*
	config package is responsible for parsing environment variables and
	defining a struct containing application services used across the server
	(e.g. logger, db client).
*/
package config

import (
	"exscientia-go-be/database"
	"exscientia-go-be/database/mongodb"
	"os"

	"github.com/caarlos0/env/v6"
	"github.com/rs/zerolog"
)

// Describes environment config and application services
type Config struct {
	Logger     *zerolog.Logger
	DBClient   database.DatabaseClient
	DBHost     string        `env:"DB_HOST" envDefault:"localhost"`
	DBPort     string        `env:"DB_PORT" envDefault:"27017"`
	ServerHost string        `env:"SERVER_HOST" envDefault:"localhost"`
	ServerPort string        `env:"SERVER_PORT" envDefault:"8080"`
	DBUser     string        `env:"DB_USER" envDefault:"user"`
	DBPassword string        `env:"DB_PASSWORD" envDefault:"password"`
	DBDatabase string        `env:"DB_DATABASE" envDefault:"default"`
	LogLevel   zerolog.Level `env:"LOG_LEVEL" envDefault:"1"`
}

// Instatiates new config based on environment
func NewConfig() (*Config, error) {
	cfg := &Config{}

	err := env.Parse(cfg)
	if err != nil {
		return nil, err
	}

	logger := zerolog.New(os.Stderr).With().Timestamp().Logger().Level(cfg.LogLevel)
	cfg.Logger = &logger

	client, err := mongodb.NewMongoClient(cfg.DBUser, cfg.DBPassword, cfg.DBHost, cfg.DBPort, cfg.DBDatabase)
	if err != nil {
		return nil, err
	}
	cfg.DBClient = client

	return cfg, nil
}
