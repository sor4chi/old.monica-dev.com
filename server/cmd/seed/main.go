package main

import (
	"context"
	"log"
	"sync"

	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/db/seed"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	dsn := db.Dsn(db.NewMySQLConnectionEnv())
	log.Println("Starting seed...")
	client, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect db", err)
	}

	ctx := context.Background()

	var wg sync.WaitGroup
	seeds := []func(context.Context, *gorm.DB){
		seed.SeedBlog,
	}

	for _, s := range seeds {
		wg.Add(1)
		go func(s func(context.Context, *gorm.DB)) {
			defer wg.Done()
			s(ctx, client)
		}(s)
	}

	wg.Wait()

	log.Println("Finished seed.")
}
