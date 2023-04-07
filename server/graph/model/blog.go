package model

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/entity"
)

func NewBlogFromEntity(e *entity.Blog) *Blog {
	publishedAt := func() *string {
		if e.PublishedAt != nil {
			str := e.PublishedAt.String()
			return &str
		}
		return nil
	}()

	return &Blog{
		ID:          fmt.Sprintf("%d", e.ID),
		Title:       e.Title,
		Slug:        e.Slug,
		Description: e.Description,
		Content:     e.Content,
		CreatedAt:   e.CreatedAt.String(),
		UpdatedAt:   e.UpdatedAt.String(),
		PublishedAt: publishedAt,
	}
}

func NewBlogsFromEntityList(e []*entity.Blog) []*Blog {
	blogs := []*Blog{}
	for _, b := range e {
		blogs = append(blogs, NewBlogFromEntity(b))
	}
	return blogs
}
