package service

import (
	"context"

	"github.com/sor4chi/portfolio-blog/server/util"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var (
	password = util.GetEnv("ADMIN_PASSWORD", "admin") // password must be hashed
)

func checkPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func UserLogin(ctx context.Context, p string) (interface{}, error) {
	if !checkPasswordHash(p, password) {
		return nil, nil
	}

	token, err := JwtGenerate(ctx)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"token": token,
	}, nil
}
