package main

import (
	"log"

	"github.com/go-git/go-git/v5/config"
)

func main() {
	config, err := config.NewConfig("./config/config.yaml")
	if err != nil {
		log.Fatalf("Failed to read config: %s", err.Error())
	}

	r := router.InitRouter(config)
	r.Run()
}
