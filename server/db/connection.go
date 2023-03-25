package db

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/util"
)

type MySQLConnectionEnv struct {
	Host     string
	Port     string
	User     string
	DBName   string
	Password string
}

func NewMySQLConnectionEnv() *MySQLConnectionEnv {
	return &MySQLConnectionEnv{
		Host:     util.GetEnv("MYSQL_HOST", "mysql"),
		Port:     util.GetEnv("MYSQL_PORT", "3306"),
		User:     util.GetEnv("MYSQL_USER", "monica"),
		DBName:   util.GetEnv("MYSQL_DATABASE", "portfolio"),
		Password: util.GetEnv("MYSQL_PASSWORD", "dev"),
	}
}

func Dsn(env *MySQLConnectionEnv) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=True",
		env.User, env.Password, env.Host, env.Port, env.DBName)
}
