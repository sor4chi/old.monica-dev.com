package server

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"
	"github.com/sor4chi/portfolio-blog/server/middleware"
)

func AuthDirective(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	_, ok := middleware.AuthCtxValue(ctx)
	if !ok {
		return nil, errors.New("unauthorized")
	}
	return next(ctx)
}
