package config

import (
	"log"

	"github.com/spf13/viper"
)

// Config variable represents the Configuration struct
var Config *Configuration

// Configuration struct handles all configuration types
type Configuration struct {
	Server    ServerConfig
	Database  DatabaseConfig
	LogConfig LogConfig
}

// ServerConfig struct accepts options to configure the API server
type ServerConfig struct {
	AppName string
	Port    string
	Secret  string
	Mode    string
}

// DatabaseConfig struct accepts options to configure the database connection
type DatabaseConfig struct {
	Driver       string
	DatabaseName string
	Username     string
	Password     string
	Host         string
	Port         string
	MaxLifetime  int
	MaxOpenConns int
	MaxIdleConns int
}

// LogConfig struct accepts options to configure logging
type LogConfig struct {
	Level      string `json:"level"`
	FileName   string `json:"file_name"`
	MaxSize    string `json:"max_size"`
	MaxAge     string `json:"max_age"`
	MaxBackups string `json:"max_backups"`
}

// Setup inits the configuration
func Setup(configPath string) {
	var configuration *Configuration

	viper.SetConfigFile(configPath)
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading config file: %s", err)
	}

	err := viper.Unmarshal(&configuration)
	if err != nil {
		log.Fatalf("Unable to decode into struct: %v", err)
	}

	Config = configuration
}

// GetConfig returns the configuration
func GetConfig() *Configuration {
	return Config
}
