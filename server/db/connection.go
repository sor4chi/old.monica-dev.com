package db

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/util"
)

type PostgresConnectionEnv struct {
	Host     string
	Port     string
	User     string
	DBName   string
	Password string
}

func NewPostgresConnectionEnv() *PostgresConnectionEnv {
	return &PostgresConnectionEnv{
		Host:     util.GetEnv("POSTGRES_HOST", "postgres"),
		Port:     util.GetEnv("POSTGRES_PORT", "5432"),
		User:     util.GetEnv("POSTGRES_USER", "monica"),
		DBName:   util.GetEnv("POSTGRES_DATABASE", "portfolio"),
		Password: util.GetEnv("POSTGRES_PASSWORD", "dev"),
	}
}

func Dsn(env *PostgresConnectionEnv) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=True",
		env.User, env.Password, env.Host, env.Port, env.DBName)
}
