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
	log.Println("Starting reset...")
	client, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect db", err)
	}

	ctx := context.Background()

	var wg sync.WaitGroup
	resets := []func(context.Context, *gorm.DB){
		seed.ResetBlog,
	}

	for _, s := range resets {
		wg.Add(1)
		go func(s func(context.Context, *gorm.DB)) {
			defer wg.Done()
			s(ctx, client)
		}(s)
	}

	wg.Wait()

	log.Println("Finished reset.")
}
