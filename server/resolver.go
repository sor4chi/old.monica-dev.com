package server

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/sor4chi/portfolio-blog/server/ent"
)

type Resolver struct{ client *ent.Client }

func NewSchema(client *ent.Client) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{client},
	})
}
