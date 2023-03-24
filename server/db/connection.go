package db

import (
	"fmt"
	"os"
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

func Dsn(env *MySQLConnectionEnv) string {
	return fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=True",
		env.User, env.Password, env.Host, env.Port, env.DBName)
}
