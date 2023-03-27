package middleware

import (
	"context"
	"log"

	"net/http"

	"github.com/sor4chi/portfolio-blog/server/service"
)

type authString string

var AUTH_STRING = authString("auth")

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")

		if auth == "" {
			next.ServeHTTP(w, r)
			return
		}

		bearer := "bearer "
		if len(auth) < len(bearer) {
			http.Error(w, "Invalid token", http.StatusForbidden)
			return
		}

		token := auth[len(bearer):]

		validate, err := service.JwtValidate(token)
		if err != nil || !validate.Valid {
			http.Error(w, "Invalid token", http.StatusForbidden)
			return
		}

		customClaim, _ := validate.Claims.(*service.JwtCustom)

		ctx := context.WithValue(r.Context(), AUTH_STRING, customClaim)

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func AuthCtxValue(ctx context.Context) (*service.JwtCustom, bool) {
	log.Println("---------AUTH_STRING---------")
	jwtCustom, ok := ctx.Value(AUTH_STRING).(*service.JwtCustom)
	if !ok {
		log.Println("Failed to get auth string from context")
		return nil, false
	} else {
		log.Println("Success to get auth string from context")
		log.Println("AUTH_STRING: ", jwtCustom)
	}
	return jwtCustom, ok
}
