package server

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.27

import (
	"context"

	"github.com/sor4chi/portfolio-blog/server/ent"
)

// Node is the resolver for the node field.
func (r *queryResolver) Node(ctx context.Context, id int) (ent.Noder, error) {
	return r.client.Noder(ctx, id)
}

// Nodes is the resolver for the nodes field.
func (r *queryResolver) Nodes(ctx context.Context, ids []int) ([]ent.Noder, error) {
	return r.client.Noders(ctx, ids)
}

// Blogs is the resolver for the blogs field.
func (r *queryResolver) Blogs(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, orderBy *ent.BlogOrder, where *ent.BlogWhereInput) (*ent.BlogConnection, error) {
	return r.client.Blog.Query().
		Paginate(ctx, after, first, before, last,
			ent.WithBlogOrder(orderBy),
			ent.WithBlogFilter(where.Filter),
		)
}

// Tags is the resolver for the tags field.
func (r *queryResolver) Tags(ctx context.Context) ([]*ent.Tag, error) {
	return r.client.Tag.Query().All(ctx)
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// CreateBlogInput returns CreateBlogInputResolver implementation.
func (r *Resolver) CreateBlogInput() CreateBlogInputResolver { return &createBlogInputResolver{r} }

type queryResolver struct{ *Resolver }
type createBlogInputResolver struct{ *Resolver }
