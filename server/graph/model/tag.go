package model

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/entity"
)

func NewTagFromEntity(e entity.Tag) Tag {
	return Tag{
		ID:        fmt.Sprintf("%d", e.ID),
		Slug:      e.Slug,
		Name:      e.Name,
		CreatedAt: e.CreatedAt.String(),
		UpdatedAt: e.UpdatedAt.String(),
	}
}

func NewTagsFromEntityList(e []*entity.Tag) []*Tag {
	tags := []*Tag{}
	for _, t := range e {
		tags = append(tags, &Tag{
			ID:        fmt.Sprintf("%d", t.ID),
			Slug:      t.Slug,
			Name:      t.Name,
			CreatedAt: t.CreatedAt.String(),
			UpdatedAt: t.UpdatedAt.String(),
		})
	}
	return tags
}
