package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/graph"
	"github.com/sor4chi/portfolio-blog/server/middleware"
	"github.com/sor4chi/portfolio-blog/server/util"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	ERROR_CONNECT_ENT_CLIENT = "failed to connect ent client"
	ERROR_MIGRATE_SCHEMA     = "failed to migrate schema"
	ERROR_START_HTTP_SERVER  = "failed to start http server"
)

var (
	SERVER_PORT = ":8081"
	IS_DEV      = util.GetEnv("ENV", "production") == "development"
)

var (
	PATH_PLAYGROUND = "/"
	PATH_GRAPHQL    = "/query"
)

func main() {
	mux := http.NewServeMux()
	dsn := db.Dsn(db.NewMySQLConnectionEnv())
	client, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(ERROR_CONNECT_ENT_CLIENT, err)
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{
		DB: client,
	}}))

	if IS_DEV {
		mux.Handle(PATH_PLAYGROUND, playground.Handler("GraphQL playground", PATH_GRAPHQL))
	}

	mm := util.NewMiddlewareManager()
	mm.Use(middleware.AuthMiddleware)
	mm.Use(middleware.CorsMiddleware)

	mux.Handle(PATH_GRAPHQL, mm.Middleware(srv))

	log.Println("listening on", SERVER_PORT)
	log.Fatal(http.ListenAndServe(SERVER_PORT, mux))
}
