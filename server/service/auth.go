package service

import (
	"context"
	"errors"

	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	password = util.GetEnv("ADMIN_PASSWORD", "") // password must be encrypted by bcrypt
)

type LoginResponse struct {
	SessionId string `json:"session_id"`
}

func UserLogin(ctx context.Context, p string) (*LoginResponse, error) {
	if password == "" {
		return nil, errors.New("internal error")
	}

	if !CompareHashPassword(password, p) {
		return nil, errors.New("invalid password")
	}

	sessionId := GenerateRandomString(32)
	Sessions[sessionId] = "admin"

	return &LoginResponse{
		SessionId: sessionId,
	}, nil
}
