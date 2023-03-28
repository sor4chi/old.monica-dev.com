package entity

import (
	"time"

	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	Description string    `json:"description"`
	Content     string    `json:"content"`
	Tags        []*Tag    `json:"tags" gorm:"many2many:blog_tags;"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	PublishedAt time.Time `json:"published_at"`
}
