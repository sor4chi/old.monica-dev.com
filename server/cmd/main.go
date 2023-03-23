package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"entgo.io/ent/dialect"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/sor4chi/portfolio-blog/server"
	"github.com/sor4chi/portfolio-blog/server/ent"
	"github.com/sor4chi/portfolio-blog/server/ent/migrate"

	_ "github.com/go-sql-driver/mysql"
)

type MySQLConnectionEnv struct {
	Host     string
	Port     string
	User     string
	DBName   string
	Password string
}

func getEnv(key string, defaultValue string) string {
	val := os.Getenv(key)
	if val != "" {
		return val
	}
	return defaultValue
}

func NewMySQLConnectionEnv() *MySQLConnectionEnv {
	return &MySQLConnectionEnv{
		Host:     getEnv("MYSQL_HOST", "mysql"),
		Port:     getEnv("MYSQL_PORT", "3306"),
		User:     getEnv("MYSQL_USER", "monica"),
		DBName:   getEnv("MYSQL_DATABASE", "portfolio"),
		Password: getEnv("MYSQL_PASSWORD", "dev"),
	}
}

func dsn(env *MySQLConnectionEnv) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=True",
		env.User, env.Password, env.Host, env.Port, env.DBName)
}

func main() {
	// Create ent.Client and run the schema migration.
	client, err := ent.Open(dialect.MySQL, dsn(NewMySQLConnectionEnv()))
	if err != nil {
		log.Fatal("opening ent client", err)
	}
	if err := client.Schema.Create(
		context.Background(),
		migrate.WithGlobalUniqueID(true),
	); err != nil {
		log.Fatal("opening ent client", err)
	}

	// Configure the server and start listening on :8081.
	srv := handler.NewDefaultServer(server.NewSchema(client))
	http.Handle("/",
		playground.Handler("Blog", "/query"),
	)
	http.Handle("/query", srv)
	log.Println("listening on :8081")
	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal("http server terminated", err)
	}
}
