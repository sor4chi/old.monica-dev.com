package main

import (
	"log"

	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/entity"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	ERROR_CONNECT_ENT_CLIENT = "failed to connect ent client"
	ERROR_MIGRATE            = "failed to migrate"
)

func main() {
	dsn := db.Dsn(db.NewMySQLConnectionEnv())
	log.Println("Starting migrate...")
	client, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(ERROR_CONNECT_ENT_CLIENT, err)
	}

	err = client.AutoMigrate(&entity.Blog{})
	if err != nil {
		log.Fatal(ERROR_MIGRATE, err)
	}

	log.Println("Finished migrate.")
}
