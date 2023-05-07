package service

import (
	"context"
	"database/sql"
	"time"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/sqlc"
)

type TimelineService struct {
	q *sqlc.Queries
}

func NewTimelineService(q *sqlc.Queries) *TimelineService {
	return &TimelineService{q: q}
}

func parseTimelineRowToEntity(row sqlc.Timeline) *entity.Timeline {
	relatedBlogID := &row.RelatedBlogID.Int32
	if !row.RelatedBlogID.Valid {
		relatedBlogID = nil
	}

	return &entity.Timeline{
		ID:            row.ID,
		Title:         row.Title,
		RelatedBlogID: relatedBlogID,
		Category:      entity.TimelineCategory(row.Category),
		Date:          row.Date,
	}
}

func parseTimelineRowsToEntity(rows []sqlc.Timeline) []*entity.Timeline {
	timelines := make([]*entity.Timeline, 0, len(rows))
	for _, row := range rows {
		timelines = append(timelines, parseTimelineRowToEntity(row))
	}
	return timelines
}

func (s *TimelineService) GetTimelines() ([]*entity.Timeline, error) {
	ctx := context.Background()
	rows, err := s.q.GetAllTimelines(ctx)
	if err != nil {
		return nil, err
	}
	return parseTimelineRowsToEntity(rows), nil
}

func (s *TimelineService) GetTimelinesByCategories(categories []int32) ([]*entity.Timeline, error) {
	ctx := context.Background()
	rows, err := s.q.GetTimelinesByCategories(ctx, categories)
	if err != nil {
		return nil, err
	}
	return parseTimelineRowsToEntity(rows), nil
}

func (s *TimelineService) CreateTimeline(title string, relatedBlogID *int32, category string, date string) (*entity.Timeline, error) {
	ctx := context.Background()
	intCategory := int32(entity.NewTimelineCategory(category))
	dateTime, err := time.Parse("2006-01-02", date)
	if err != nil {
		return nil, err
	}
	row, err := s.q.CreateTimeline(ctx, sqlc.CreateTimelineParams{
		Title: title,
		RelatedBlogID: sql.NullInt32{
			Int32: *relatedBlogID,
			Valid: relatedBlogID != nil,
		},
		Category: intCategory,
		Date:     dateTime,
	})
	if err != nil {
		return nil, err
	}
	return parseTimelineRowToEntity(row), nil
}
