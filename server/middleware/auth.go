package middleware

import (
	"context"
	"errors"

	"net/http"

	"github.com/99designs/gqlgen/graphql"
	"github.com/sor4chi/portfolio-blog/server/service"
)

type AuthCtx struct {
	Username *string
}

type AuthCtxKey string

var AUTH_CTX_KEY = AuthCtxKey("auth")

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sessionId := service.GetSessionID(r.Header)

		if sessionId == "" {
			ctx := context.WithValue(r.Context(), AUTH_CTX_KEY, &AuthCtx{
				Username: nil,
			})
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
			return
		}

		username := service.Sessions[sessionId]

		if username == "" {
			ctx := context.WithValue(r.Context(), AUTH_CTX_KEY, &AuthCtx{
				Username: nil,
			})
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
			return
		}

		ctx := context.WithValue(r.Context(), AUTH_CTX_KEY, &AuthCtx{
			Username: &username,
		})

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func AuthCtxValue(ctx context.Context) (*AuthCtx, bool) {
	authCtx, ok := ctx.Value(AUTH_CTX_KEY).(*AuthCtx)
	return authCtx, ok
}

func AuthDirective(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	authCtx, _ := AuthCtxValue(ctx)
	if authCtx.Username == nil {
		return nil, errors.New("unauthorized")
	}
	return next(ctx)
}
