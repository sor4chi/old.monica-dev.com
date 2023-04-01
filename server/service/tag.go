package service

import (
	"context"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/sqlc"
)

type TagService struct {
	q *sqlc.Queries
}

func NewTagService(q *sqlc.Queries) *TagService {
	return &TagService{q: q}
}

func parseTagsTableToEntity(rows []sqlc.Tag) []*entity.Tag {
	tags := make([]*entity.Tag, 0, len(rows))
	for _, row := range rows {
		tags = append(tags, &entity.Tag{
			ID:        row.ID,
			Slug:      row.Slug,
			Name:      row.Name,
			CreatedAt: row.CreatedAt,
			UpdatedAt: row.UpdatedAt,
		})
	}
	return tags
}

func (s *TagService) GetTagsByBlogId(ctx context.Context, blogID int32) ([]*entity.Tag, error) {
	rows, err := s.q.GetTagsByBlogId(ctx, blogID)
	if err != nil {
		return nil, err
	}
	return parseTagsTableToEntity(rows), nil
}
