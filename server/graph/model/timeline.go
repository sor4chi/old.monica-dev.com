package model

import (
	"fmt"

	"github.com/sor4chi/portfolio-blog/server/entity"
)

func NewTimelineFromEntity(e *entity.Timeline) *Timeline {
	return &Timeline{
		ID:       fmt.Sprintf("%d", e.ID),
		Date:     e.Date.String(),
		Title:    e.Title,
		Category: e.Category.String(),
		RelatedBlogID: func() *string {
			if e.RelatedBlogID == nil {
				return nil
			}
			id := fmt.Sprintf("%d", *e.RelatedBlogID)
			return &id
		}(),
	}
}

func NewTimelinesFromEntityList(e []*entity.Timeline) []*Timeline {
	timelines := []*Timeline{}
	for _, t := range e {
		timelines = append(timelines, &Timeline{
			ID:       fmt.Sprintf("%d", t.ID),
			Date:     t.Date.String(),
			Title:    t.Title,
			Category: t.Category.String(),
			RelatedBlogID: func() *string {
				if t.RelatedBlogID == nil {
					return nil
				}
				id := fmt.Sprintf("%d", *t.RelatedBlogID)
				return &id
			}(),
		})
	}
	return timelines
}
