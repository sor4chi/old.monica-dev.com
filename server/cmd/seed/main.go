package main

import (
	"context"
	"database/sql"
	"log"
	"sync"

	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/db/seed"
	"github.com/sor4chi/portfolio-blog/server/sqlc"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	dsn := db.Dsn(db.NewMySQLConnectionEnv())
	log.Println("Starting seed...")
	con, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("failed to connect db client", err)
	}
	defer con.Close()

	client := sqlc.New(con)

	ctx := context.Background()

	var wg sync.WaitGroup
	seeds := []func(context.Context, *sqlc.Queries){
		seed.SeedBlog,
	}

	for _, s := range seeds {
		wg.Add(1)
		go func(s func(context.Context, *sqlc.Queries)) {
			defer wg.Done()
			s(ctx, client)
		}(s)
	}

	wg.Wait()

	log.Println("Finished seed.")
}
