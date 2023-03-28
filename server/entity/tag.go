package entity

import (
	"time"

	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	ID        int       `json:"id"`
	Slug      string    `json:"slug" gorm:"type:varchar(255);uniqueIndex:idx_tag_slug"`
	Name      string    `json:"name"`
	Blogs     []*Blog   `json:"blogs" gorm:"many2many:blog_tags;"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
