package service

import (
	"errors"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/sor4chi/portfolio-blog/server/util"
)

type JwtCustom struct {
	jwt.StandardClaims
}

var (
	jwtSecret = []byte(
		util.GetEnv("JWT_SECRET", ""),
	)
	ERR_INVALID_TOKEN      = "Invalid token"
	ERR_INVALID_CLAIM      = "Invalid claim"
	ERR_INVALID_JWT_SECRET = "Invalid jwt secret"
)

func JwtGenerate() (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, &JwtCustom{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	})

	token, err := t.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return token, nil
}

func JwtValidate(token string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(token, &JwtCustom{}, func(t *jwt.Token) (interface{}, error) {
		if _, success := t.Method.(*jwt.SigningMethodHMAC); !success {
			return nil, errors.New(ERR_INVALID_TOKEN)
		}
		return jwtSecret, nil
	})
}
