package main

import (
	"context"
	"log"
	"sync"

	"entgo.io/ent/dialect"
	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/ent"
	"github.com/sor4chi/portfolio-blog/server/seed"

	_ "github.com/go-sql-driver/mysql"
)

var (
	ERROR_CONNECT_ENT_CLIENT = "failed to connect ent client"
)

func main() {
	log.Println("Starting seed...")
	client, err := ent.Open(dialect.MySQL, db.Dsn(db.NewMySQLConnectionEnv()))
	if err != nil {
		log.Fatal(ERROR_CONNECT_ENT_CLIENT, err)
	}
	defer client.Close()

	ctx := context.Background()

	var wg sync.WaitGroup
	seeds := []func(context.Context, *ent.Client){
		seed.SeedBlog,
	}

	for _, s := range seeds {
		wg.Add(1)
		go func(s func(context.Context, *ent.Client)) {
			defer wg.Done()
			s(ctx, client)
		}(s)
	}

	wg.Wait()

	log.Println("Finished seed.")
}
