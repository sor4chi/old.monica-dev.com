package service

import (
	"context"
	"strings"

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
	q       *sqlc.Queries
	isAdmin bool
}

func NewBlogService(q *sqlc.Queries, isAdmin bool) *BlogService {
	return &BlogService{
		q,
		isAdmin,
	}
}

func parseBlogsTagsViewToEntity(rows []sqlc.BlogsTagsView) []*entity.Blog {
	bm := make(map[int32]*entity.Blog)
	for _, row := range rows {
		if _, ok := bm[row.ID]; !ok {
			bm[row.ID] = &entity.Blog{
				ID:          row.ID,
				Title:       row.Title,
				Slug:        row.Slug,
				Description: row.Description,
				Content:     row.Content,
				CreatedAt:   row.CreatedAt,
				UpdatedAt:   row.UpdatedAt,
				PublishedAt: &row.PublishedAt.Time,
			}
		}
		bm[row.ID].Tags = append(bm[row.ID].Tags, &entity.Tag{
			ID:        row.TagID,
			Slug:      row.TagSlug,
			Name:      row.TagName,
			CreatedAt: row.TagCreatedAt,
			UpdatedAt: row.TagUpdatedAt,
		})
	}

	blogs := make([]*entity.Blog, 0, len(bm))
	for _, blog := range bm {
		blogs = append(blogs, blog)
	}

	return blogs
}

type GetBlogsParam struct {
	Limit  int32
	Offset int32
}

func (s *BlogService) GetBlogs(limit, offset int) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	var rows []sqlc.BlogsTagsView
	var total int64
	var err error

	p := GetBlogsParam{
		Limit:  int32(limit),
		Offset: int32(offset),
	}
	ctx := context.Background()

	if s.isAdmin {
		rows, err = s.q.GetBlogs(ctx, sqlc.GetBlogsParams(p))
		if err != nil {
			return nil, 0, err
		}
		total, err = s.q.GetBlogsCount(ctx)
		if err != nil {
			return nil, 0, err
		}
	} else {
		rows, err = s.q.GetPublishedBlogs(ctx, sqlc.GetPublishedBlogsParams(p))
		if err != nil {
			return nil, 0, err
		}
		total, err = s.q.GetPublishedBlogsCount(ctx)
		if err != nil {
			return nil, 0, err
		}
	}

	return parseBlogsTagsViewToEntity(rows), int(total), nil
}

type GetBlogsByTagSlugsParams struct {
	Slug   string
	Limit  int32
	Offset int32
}

func (s *BlogService) GetBlogsByTagSlugs(limit, offset int, tags []string) ([]*entity.Blog, int, error) {
	if limit > MAX_LIMIT_PER_PAGE {
		limit = MAX_LIMIT_PER_PAGE
	}

	var rows []sqlc.BlogsTagsView
	var total int64
	slug := strings.Join(tags, ",")
	var err error

	p := GetBlogsByTagSlugsParams{
		Limit:  int32(limit),
		Offset: int32(offset),
		Slug:   slug,
	}
	ctx := context.Background()

	if s.isAdmin {
		rows, err = s.q.GetBlogsByTagSlugs(ctx, sqlc.GetBlogsByTagSlugsParams(p))
		if err != nil {
			return nil, 0, err
		}
		total, err = s.q.GetBlogsByTagSlugsCount(ctx, slug)
		if err != nil {
			return nil, 0, err
		}
	} else {
		rows, err = s.q.GetPublishedBlogsByTagSlugs(ctx, sqlc.GetPublishedBlogsByTagSlugsParams(p))
		if err != nil {
			return nil, 0, err
		}
		total, err = s.q.GetPublishedBlogsByTagSlugsCount(ctx, slug)
		if err != nil {
			return nil, 0, err
		}
	}

	return parseBlogsTagsViewToEntity(rows), int(total), nil
}

func (s *BlogService) GetBlogBySlug(slug string) (*entity.Blog, error) {
	var row sqlc.BlogsTagsView
	var err error

	ctx := context.Background()

	if s.isAdmin {
		row, err = s.q.GetBlogBySlug(ctx, slug)
		if err != nil {
			return nil, err
		}
	} else {
		row, err = s.q.GetPublishedBlogBySlug(ctx, slug)
		if err != nil {
			return nil, err
		}
	}

	return parseBlogsTagsViewToEntity([]sqlc.BlogsTagsView{row})[0], nil
}
