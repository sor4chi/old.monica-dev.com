package entity

import (
	"time"
)

type Blog struct {
	ID          int32      `json:"id"`
	Title       string     `json:"title"`
	Slug        string     `json:"slug"`
	Description string     `json:"description"`
	Content     string     `json:"content"`
	Tags        []*Tag     `json:"tags"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	PublishedAt *time.Time `json:"published_at"`
}
