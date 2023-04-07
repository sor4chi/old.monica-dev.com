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

func parseTagsRowToEntity(row sqlc.Tag) *entity.Tag {
	return &entity.Tag{
		ID:        row.ID,
		Slug:      row.Slug,
		Name:      row.Name,
		CreatedAt: row.CreatedAt,
		UpdatedAt: row.UpdatedAt,
	}
}

func parseTagsRowsToEntity(rows []sqlc.Tag) []*entity.Tag {
	tags := make([]*entity.Tag, 0, len(rows))
	for _, row := range rows {
		tags = append(tags, parseTagsRowToEntity(row))
	}
	return tags
}

func (s *TagService) GetTags() ([]*entity.Tag, error) {
	ctx := context.Background()
	rows, err := s.q.GetTags(ctx)
	if err != nil {
		return nil, err
	}
	return parseTagsRowsToEntity(rows), nil
}

func (s *TagService) GetTagsByBlogId(blogID int32) ([]*entity.Tag, error) {
	ctx := context.Background()
	rows, err := s.q.GetTagsByBlogId(ctx, blogID)
	if err != nil {
		return nil, err
	}
	return parseTagsRowsToEntity(rows), nil
}

func (s *TagService) CreateTag(tag *entity.Tag) (*entity.Tag, error) {
	ctx := context.Background()
	created, err := s.q.CreateTag(ctx, sqlc.CreateTagParams{
		Slug: tag.Slug,
		Name: tag.Name,
	})

	if err != nil {
		return nil, err
	}

	return parseTagsRowToEntity(created), nil
}

func (s *TagService) CreateBlogTags(blogID int32, tagIDs []int32) error {
	ctx := context.Background()
	for _, tagID := range tagIDs {
		err := s.q.CreateBlogTag(ctx, sqlc.CreateBlogTagParams{
			BlogID: blogID,
			TagID:  tagID,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
