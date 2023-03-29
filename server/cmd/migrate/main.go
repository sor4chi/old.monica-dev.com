package main

import (
	"log"
	"time"

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

	// loop until db is ready
	var client *gorm.DB
	var err error
	for {
		client, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Println("Failed to connect to database. Retrying...")
			time.Sleep(5 * time.Second)
			continue
		}
		break
	}

	err = client.AutoMigrate(&entity.Tag{}, &entity.Blog{})
	if err != nil {
		log.Fatal(ERROR_MIGRATE, err)
	}

	log.Println("Finished migrate.")
}
