package service

import (
	"time"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"gorm.io/gorm"
)

const (
	MAX_LIMIT_PER_PAGE = 30
	PUBLIC_FILTER      = "published_at IS NOT NULL"
	TABLE_BLOG         = "blogs"
	TABLE_BLOG_TAGS    = "blog_tags"
	TABLE_TAGS         = "tags"
)

type BlogService struct {
	db      *gorm.DB
	isAdmin bool
}

func NewBlogService(db *gorm.DB, isAdmin bool) *BlogService {
	return &BlogService{
		db,
		isAdmin,
	}
}

func (s *BlogService) GetBlogs(limit, offset int, tags []string) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	var blogs []*entity.Blog
	var total int64

	var q *gorm.DB

	if len(tags) > 0 {
		q = s.db.Where("id IN (?)",
			s.db.Table(TABLE_BLOG_TAGS).Select("blog_id").Where(
				"tag_id IN (?)",
				s.db.Table(TABLE_TAGS).Select("id").Where("slug IN (?)", tags),
			),
		)
	} else {
		q = s.db.Preload(TABLE_TAGS)
	}

	if s.isAdmin {
		q = q.Where(PUBLIC_FILTER)
	}

	q.Model(&entity.Blog{}).Count(&total)
	q.Limit(limit).Offset(offset).Find(&blogs)

	return blogs, int(total), nil
}

func (s *BlogService) GetBlogBySlug(slug string) (*entity.Blog, error) {
	var blog entity.Blog
	var q *gorm.DB

	q = s.db.Preload(TABLE_TAGS)
	if !s.isAdmin {
		q = q.Where(PUBLIC_FILTER)
	}
	q = q.First(&blog, "slug = ?", slug)
	if q.Error != nil {
		return nil, q.Error
	}

	return &blog, nil
}

func (s *BlogService) CreateBlog(title, slug, description, content string, published bool, tags []*entity.Tag) (*entity.Blog, error) {
	blog := &entity.Blog{
		Title:       title,
		Slug:        slug,
		Description: description,
		Content:     content,
	}

	if published {
		now := time.Now()
		blog.PublishedAt = &now
	} else {
		blog.PublishedAt = nil
	}

	if err := s.db.Create(blog).Error; err != nil {
		return nil, err
	}

	if err := s.db.Model(blog).Association("Tags").Append(tags); err != nil {
		return nil, err
	}

	return blog, nil
}

func (s *BlogService) UpdateBlog(id string, title, slug, description, content string, published bool, tags []*entity.Tag) (*entity.Blog, error) {
	var blog entity.Blog
	if err := s.db.First(&blog, id).Error; err != nil {
		return nil, err
	}

	blog.Title = title
	blog.Slug = slug
	blog.Description = description
	blog.Content = content

	if published && blog.PublishedAt == nil {
		now := time.Now()
		blog.PublishedAt = &now
	} else {
		blog.PublishedAt = nil
	}

	if tags != nil {
		if err := s.db.Model(&blog).Association("Tags").Replace(tags); err != nil {
			return nil, err
		}
	}

	if err := s.db.Save(&blog).Error; err != nil {
		return nil, err
	}

	return &blog, nil
}
