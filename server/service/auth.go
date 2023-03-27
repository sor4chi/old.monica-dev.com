package service

import (
	"context"
	"errors"

	"github.com/sor4chi/portfolio-blog/server/util"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var (
	password = util.GetEnv("ADMIN_PASSWORD", "") // password must be encrypted by bcrypt
)

func checkPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

type LoginResponse struct {
	Token string `json:"token"`
}

func UserLogin(ctx context.Context, p string) (LoginResponse, error) {
	if password == "" {
		return LoginResponse{}, errors.New("internal error")
	}

	if !checkPasswordHash(p, password) {
		return LoginResponse{}, errors.New("invalid password")
	}

	token, err := JwtGenerate()
	if err != nil {
		return LoginResponse{}, err
	}

	return LoginResponse{
		Token: token,
	}, nil
}
