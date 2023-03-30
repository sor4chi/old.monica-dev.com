package entity

import (
	"time"

	"gorm.io/gorm"
)

type Tag struct {
	gorm.Model
	ID        int       `json:"id"`
	Slug      string    `json:"slug" gorm:"type:varchar(255);uniqueIndex:idx_tag_slug;not null"`
	Name      string    `json:"name" gorm:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"not null"`
	UpdatedAt time.Time `json:"updated_at" gorm:"not null"`
}
