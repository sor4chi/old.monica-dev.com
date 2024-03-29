package main

import (
	"log"
	"net/http"
	"os"

	"database/sql"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/sor4chi/portfolio-blog/server/db"
	"github.com/sor4chi/portfolio-blog/server/graph"
	"github.com/sor4chi/portfolio-blog/server/middleware"
	"github.com/sor4chi/portfolio-blog/server/service"
	"github.com/sor4chi/portfolio-blog/server/sqlc"
	"github.com/sor4chi/portfolio-blog/server/util"

	"github.com/rs/zerolog"
	sqldblogger "github.com/simukti/sqldb-logger"
	"github.com/simukti/sqldb-logger/logadapter/zerologadapter"

	_ "github.com/lib/pq"
)

var (
	ERROR_CONNECT_DB_CLIENT = "failed to connect db client"
	ERROR_MIGRATE_SCHEMA    = "failed to migrate schema"
	ERROR_START_HTTP_SERVER = "failed to start http server"
)

var (
	SERVER_PORT = ":8081"
	IS_DEV      = util.GetEnv("ENV", "production") == "development"
)

var (
	PATH_PLAYGROUND = "/"
	PATH_GRAPHQL    = "/query"
	LOGIN_PATH      = "/login"
	LOGOUT_PATH     = "/logout"
	UPLOAD_PATH     = "/upload"
	ME_PATH         = "/me"
)

func main() {
	mux := http.NewServeMux()
	dsn := db.DsnFromUrl(util.GetEnvStrict("DATABASE_URL"))
	con, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal(ERROR_CONNECT_DB_CLIENT, err)
	}
	defer con.Close()

	if IS_DEV {
		logger := zerolog.New(
			zerolog.ConsoleWriter{Out: os.Stdout, NoColor: false},
		)

		con = sqldblogger.OpenDriver(
			dsn,
			con.Driver(),
			zerologadapter.New(logger),
		)
	}

	client := sqlc.New(con)
	if err != nil {
		log.Fatal(ERROR_CONNECT_DB_CLIENT, err)
	}

	c := graph.Config{Resolvers: &graph.Resolver{
		Q: client,
	}}
	c.Directives.Auth = middleware.AuthDirective

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(c))

	if IS_DEV {
		mux.Handle(PATH_PLAYGROUND, playground.Handler("GraphQL playground", PATH_GRAPHQL))
	}

	mm := util.NewMiddlewareManager()
	mm.Use(middleware.CorsMiddleware)

	mux.Handle(LOGIN_PATH, mm.MiddlewareFunc(service.UserLogin))
	mux.Handle(LOGOUT_PATH, mm.MiddlewareFunc(service.UserLogout))
	mux.Handle(ME_PATH, mm.MiddlewareFunc(service.UserMe))

	mm.Use(middleware.AuthMiddleware)
	mux.Handle(UPLOAD_PATH, mm.MiddlewareFunc(service.Upload))

	mux.Handle(PATH_GRAPHQL, mm.Middleware(srv))

	log.Println("listening on", SERVER_PORT)
	log.Fatal(http.ListenAndServe(SERVER_PORT, mux))
}
