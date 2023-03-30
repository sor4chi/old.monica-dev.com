package model

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/entity"
)

func NewBlogFromEntity(e *entity.Blog) *Blog {
	tags := NewTagFromEntityList(e.Tags)

	return &Blog{
		ID:          fmt.Sprintf("%d", e.ID),
		Title:       e.Title,
		Slug:        e.Slug,
		Description: e.Description,
		Content:     e.Content,
		Tags:        tags,
		CreatedAt:   e.CreatedAt.String(),
		UpdatedAt:   e.UpdatedAt.String(),
		PublishedAt: func() *string {
			if e.PublishedAt == nil {
				return nil
			}
			s := e.PublishedAt.String()
			return &s
		}(),
	}
}

func NewBlogsFromEntityList(e []*entity.Blog) []*Blog {
	blogs := []*Blog{}
	for _, b := range e {
		blogs = append(blogs, NewBlogFromEntity(b))
	}
	return blogs
}
