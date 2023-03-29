package entity

import (
	"time"

	"gorm.io/gorm"
)

type Blog struct {
	gorm.Model
	ID          int       `json:"id" gorm:"not null"`
	Title       string    `json:"title" gorm:"not null"`
	Slug        string    `json:"slug" gorm:"type:varchar(255);uniqueIndex:idx_blog_slug;not null"`
	Description string    `json:"description" gorm:"not null"`
	Content     string    `json:"content" gorm:"not null"`
	Tags        []*Tag    `json:"tags" gorm:"many2many:blog_tags;"`
	CreatedAt   time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"not null"`
	PublishedAt time.Time `json:"published_at"`
}
