package middleware

import (
	"context"

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
		auth = auth[len(bearer):]

		validate, err := service.JwtValidate(context.Background(), auth)
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

func CtxValue(ctx context.Context) *service.JwtCustom {
	raw, _ := ctx.Value(AUTH_STRING).(*service.JwtCustom)
	return raw
}
