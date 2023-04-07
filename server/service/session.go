package service

import (
	"math/rand"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
)

var Sessions = map[string]string{}
var SessionIDKey = "session_id"

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func GenerateRandomString(length int) string {
	rand.Seed(time.Now().UnixNano())
	var result strings.Builder
	for i := 0; i < length; i++ {
		result.WriteByte(CHARS[rand.Intn(len(CHARS))])
	}
	return result.String()
}

func CompareHashPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GetSessionID(headers http.Header) string {
	if cookie, ok := headers["Cookie"]; ok {
		for _, c := range cookie {
			if strings.HasPrefix(c, SessionIDKey+"=") {
				return strings.TrimPrefix(c, SessionIDKey+"=")
			}
		}
	}
	return ""
}
