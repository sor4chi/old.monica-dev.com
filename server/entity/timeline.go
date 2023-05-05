package entity

import (
	"time"
)

type Timeline struct {
	ID            int32            `json:"id"`
	Title         string           `json:"title"`
	RelatedBlogID *int32           `json:"related_blog_id"`
	Category      TimelineCategory `json:"category"`
	Date          time.Time        `json:"date"`
}

type TimelineCategory int

const (
	TimelineCategoryOther TimelineCategory = 0
	TimelineCategoryWork  TimelineCategory = iota
	TimelineCategoryEducation
	TimelineCategoryAward
	TimelineCategoryProduct
	TimelineCategoryBlog
)

func (c TimelineCategory) String() string {
	switch c {
	case TimelineCategoryWork:
		return "work"
	case TimelineCategoryEducation:
		return "education"
	case TimelineCategoryAward:
		return "award"
	case TimelineCategoryProduct:
		return "product"
	case TimelineCategoryBlog:
		return "blog"
	default:
		return "other"
	}
}
