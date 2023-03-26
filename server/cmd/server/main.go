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
	"github.com/sor4chi/portfolio-blog/server/middleware"
	"github.com/sor4chi/portfolio-blog/server/util"

	_ "github.com/go-sql-driver/mysql"
)

var (
	ERROR_CONNECT_ENT_CLIENT = "failed to connect ent client"
	ERROR_MIGRATE_SCHEMA     = "failed to migrate schema"
	ERROR_START_HTTP_SERVER  = "failed to start http server"
)

var (
	SERVER_PORT      = ":8081"
	IS_DEV           = util.GetEnv("ENV", "production") == "development"
	PLAYGROUND_TITLE = "Monica.log GQL PLAYGROUND"
)

var (
	PATH_PLAYGROUND = "/"
	PATH_GRAPHQL    = "/query"
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
	// Init HTTP server with mux.
	mux := http.NewServeMux()

	// Configure the server and start listening on SERVER_PORT.
	srv := handler.NewDefaultServer(server.NewSchema(client))

	if IS_DEV {
		// GraphQL playground for development.
		mux.Handle(PATH_PLAYGROUND, playground.Handler(PLAYGROUND_TITLE, PATH_GRAPHQL))
	}

	mm := util.NewMiddlewareManager()
	mm.Use(middleware.AuthMiddleware)
	mm.Use(middleware.CorsMiddleware)

	mux.Handle(PATH_GRAPHQL, mm.Middleware(srv))

	log.Println("listening on", SERVER_PORT)
	if err := http.ListenAndServe(SERVER_PORT, mux); err != nil {
		log.Fatal(ERROR_START_HTTP_SERVER, err)
	}
}
