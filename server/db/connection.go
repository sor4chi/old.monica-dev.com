package db

import (
	"fmt"
	"log"
	"regexp"
)

type PostgresConnectionEnv struct {
	Host     string
	Port     string
	User     string
	DBName   string
	Password string
}

func Dsn(env *PostgresConnectionEnv) string {
	return fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		env.Host, env.Port, env.User, env.DBName, env.Password)
}

func DsnFromUrl(databaseUrl string) string {
	re := regexp.MustCompile(`postgres:\/\/(?P<user>[^:]+):(?P<password>[^@]+)@(?P<host>[^:]+):(?P<port>[^/]+)\/(?P<dbname>[^?]+)`)
	match := re.FindStringSubmatch(databaseUrl)
	if len(match) == 0 {
		log.Fatal("failed to parse database url")
	}
	env := &PostgresConnectionEnv{
		Host:     match[3],
		Port:     match[4],
		User:     match[1],
		DBName:   match[5],
		Password: match[2],
	}
	return Dsn(env)
}
