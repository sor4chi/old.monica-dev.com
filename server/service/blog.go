package service

import (
	"context"
	"database/sql"
	"time"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/sqlc"
)

const (
	MAX_LIMIT_PER_PAGE = 30
	PUBLIC_FILTER      = "published_at IS NOT NULL"
	TABLE_BLOG         = "blogs"
	TABLE_BLOG_TAGS    = "blog_tags"
	TABLE_TAGS         = "tags"
)

type BlogService struct {
	q *sqlc.Queries
}

func NewBlogService(q *sqlc.Queries) *BlogService {
	return &BlogService{
		q,
	}
}

func parseBlogsRowToEntity(row sqlc.Blog) *entity.Blog {
	publishedAt := func() *time.Time {
		if row.PublishedAt.Valid {
			return &row.PublishedAt.Time
		}
		return nil
	}()

	return &entity.Blog{
		ID:          row.ID,
		Title:       row.Title,
		Slug:        row.Slug,
		Description: row.Description,
		Content:     row.Content,
		CreatedAt:   row.CreatedAt,
		UpdatedAt:   row.UpdatedAt,
		PublishedAt: publishedAt,
	}
}

func parseBlogsRowsToEntity(rows []sqlc.Blog) []*entity.Blog {
	blogs := make([]*entity.Blog, 0, len(rows))
	for _, row := range rows {
		blogs = append(blogs, parseBlogsRowToEntity(row))
	}

	return blogs
}

type PaginateParams struct {
	Limit  int32
	Offset int32
}

func (s *BlogService) GetPublishedBlogs(limit, offset int) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	ctx := context.Background()

	rows, err := s.q.GetPublishedBlogs(ctx, sqlc.GetPublishedBlogsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	})
	if err != nil {
		return nil, 0, err
	}
	total, err := s.q.GetPublishedBlogsCount(ctx)
	if err != nil {
		return nil, 0, err
	}

	return parseBlogsRowsToEntity(rows), int(total), nil
}

func (s *BlogService) GetPublishedBlogsByTagSlugs(limit, offset int, tags []string) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	ctx := context.Background()

	rows, err := s.q.GetPublishedBlogsByTagSlugs(ctx, sqlc.GetPublishedBlogsByTagSlugsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
		Slugs:  tags,
	})
	if err != nil {
		return nil, 0, err
	}
	total, err := s.q.GetPublishedBlogsByTagSlugsCount(ctx, tags)
	if err != nil {
		return nil, 0, err
	}

	return parseBlogsRowsToEntity(rows), int(total), nil
}

func (s *BlogService) GetAllBlogsByTagSlugs(limit, offset int, tags []string) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	ctx := context.Background()

	rows, err := s.q.GetAllBlogsByTagSlugs(ctx, sqlc.GetAllBlogsByTagSlugsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
		Slugs:  tags,
	})
	if err != nil {
		return nil, 0, err
	}
	total, err := s.q.GetAllBlogsByTagSlugsCount(ctx, tags)
	if err != nil {
		return nil, 0, err
	}

	return parseBlogsRowsToEntity(rows), int(total), nil
}

func (s *BlogService) GetAllBlogs(limit, offset int) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	ctx := context.Background()

	rows, err := s.q.GetAllBlogs(ctx, sqlc.GetAllBlogsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
	})
	if err != nil {
		return nil, 0, err
	}
	total, err := s.q.GetAllBlogsCount(ctx)
	if err != nil {
		return nil, 0, err
	}

	return parseBlogsRowsToEntity(rows), int(total), nil
}

func (s *BlogService) GetPublishedBlogBySlug(slug string) (*entity.Blog, error) {
	ctx := context.Background()

	row, err := s.q.GetPublishedBlogBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}

	return parseBlogsRowToEntity(row), nil
}

func (s *BlogService) GetBlogById(id int32) (*entity.Blog, error) {

	ctx := context.Background()

	row, err := s.q.GetBlogById(ctx, id)
	if err != nil {
		return nil, err
	}

	return parseBlogsRowToEntity(row), nil
}

func (s *BlogService) CreateBlog(title, slug, description, content string, published bool) (*entity.Blog, error) {
	ctx := context.Background()
	p := sqlc.CreateBlogParams{
		Title:       title,
		Slug:        slug,
		Description: description,
		Content:     content,
	}
	if published {
		now := time.Now()
		p.PublishedAt = sql.NullTime{
			Time:  now,
			Valid: true,
		}
	}

	row, err := s.q.CreateBlog(ctx, p)
	if err != nil {
		return nil, err
	}

	return parseBlogsRowToEntity(row), nil
}
