package util

import (
	"os"
)

func GetEnv(key string, defaultValue string) string {
	val := os.Getenv(key)
	if val != "" {
		return val
	}
	return defaultValue
}

func GetEnvStrict(key string) string {
	val := os.Getenv(key)
	if val == "" {
		panic("environment variable not set: " + key)
	}
	return val
}
