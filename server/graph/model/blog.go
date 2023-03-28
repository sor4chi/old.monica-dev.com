package model

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/entity"
)

func NewBlogFromEntity(e *entity.Blog) *Blog {
	tags := make([]*Tag, len(e.Tags))
	for i, tag := range e.Tags {
		tags[i] = NewTagFromEntity(tag)
	}

	return &Blog{
		ID:          fmt.Sprintf("%d", e.ID),
		Title:       e.Title,
		Slug:        e.Slug,
		Description: e.Description,
		Content:     e.Content,
		Tags:        tags,
		CreatedAt:   e.CreatedAt.String(),
		UpdatedAt:   e.UpdatedAt.String(),
		PublishedAt: e.PublishedAt.String(),
	}
}
