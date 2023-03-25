package main

import (
	"context"
	"log"
	"net/http"

	"entgo.io/ent/dialect"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/sor4chi/portfolio-blog/server"
	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/ent"
	"github.com/sor4chi/portfolio-blog/server/ent/migrate"
	"github.com/sor4chi/portfolio-blog/server/util"

	_ "github.com/go-sql-driver/mysql"
)

var (
	ERROR_CONNECT_ENT_CLIENT = "failed to connect ent client"
	ERROR_MIGRATE_SCHEMA     = "failed to migrate schema"
	ERROR_START_HTTP_SERVER  = "failed to start http server"

	GRAPHQL_PATH = "/query"
	SERVER_PORT  = ":8081"
)

func main() {
	client, err := ent.Open(dialect.MySQL, db.Dsn(db.NewMySQLConnectionEnv()))
	if err != nil {
		log.Fatal(ERROR_CONNECT_ENT_CLIENT, err)
	}
	if err := client.Schema.Create(
		context.Background(),
		migrate.WithGlobalUniqueID(true),
	); err != nil {
		log.Fatal(ERROR_MIGRATE_SCHEMA, err)
	}

	// Configure the server and start listening on :8081.
	srv := handler.NewDefaultServer(server.NewSchema(client))
	http.Handle("/",
		playground.Handler("Blog", GRAPHQL_PATH),
	)
	http.HandleFunc(GRAPHQL_PATH, func(w http.ResponseWriter, r *http.Request) {
		allow := util.GetEnv("ALLOW_ORIGIN", "*")

		w.Header().Set("Access-Control-Allow-Origin", allow)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			return
		}

		srv.ServeHTTP(w, r)
	})

	log.Println("listening on", SERVER_PORT)
	if err := http.ListenAndServe(SERVER_PORT, nil); err != nil {
		log.Fatal(ERROR_START_HTTP_SERVER, err)
	}
}
