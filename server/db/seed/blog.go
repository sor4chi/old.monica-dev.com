package seed

import (
	"context"
	"database/sql"
	"log"
	"math/rand"
	"path/filepath"
	"time"

	"github.com/gosimple/slug"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/sqlc"
	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	WD                     = util.GetEnv("PWD", ".")
	BLOG_FIXTURE_PATH      = filepath.Join(WD, "db/seed/fixtures/blogs.json")
	MAX_TAGS               = 3
	ERROR_CREATE_BLOG      = "failed creating blog: %v"
	ERROR_CONNECT_BLOG_TAG = "failed connecting blog and tag: %v"
	ERROR_LOAD_JSON        = "failed loading dummy data: %v"

	ERROR_RESET_BLOGS = "failed reseting blogs: %v"
	ERROR_RESET_TAGS  = "failed reseting tags: %v"
	ERROR_RESET_BTT   = "failed reseting blog_tag: %v"
)

type Input struct {
	Title       string   `json:"title"`
	Slug        string   `json:"slug"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Tags        []string `json:"tags"`
}

func SeedBlog(ctx context.Context, q *sqlc.Queries) {
	var dumies []Input

	if err := util.LoadJSON(BLOG_FIXTURE_PATH, &dumies); err != nil {
		log.Fatalf(ERROR_LOAD_JSON, err)
	}

	for i := 0; i < len(dumies); i++ {
		tags := []*entity.Tag{}
		for _, t := range dumies[i].Tags {
			var tagId int32
			s := slug.Make(t)
			res, err := q.CreateTag(ctx, sqlc.CreateTagParams{
				Name: t,
				Slug: s,
			})
			if err != nil {
				tag, _ := q.GetTagBySlug(ctx, s)
				tagId = tag.ID
			} else {
				tagId = res.ID
			}
			tags = append(tags, &entity.Tag{
				ID:   tagId,
				Name: t,
				Slug: s,
			})
		}

		now := time.Now()
		publish := rand.Float32() < 0.8

		res, err := q.CreateBlog(ctx, sqlc.CreateBlogParams{
			Title:       dumies[i].Title,
			Slug:        dumies[i].Slug,
			Description: dumies[i].Description,
			Content:     dumies[i].Content,
			PublishedAt: sql.NullTime{
				Time:  now,
				Valid: publish,
			},
		})
		if err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}

		if err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}

		for _, t := range tags {
			if err := q.CreateBlogTag(ctx, sqlc.CreateBlogTagParams{
				BlogID: int32(res.ID),
				TagID:  t.ID,
			}); err != nil {
				log.Fatalf(ERROR_CONNECT_BLOG_TAG, err)
			}
		}
	}
}

func ResetSeedBlog(ctx context.Context, q *sqlc.Queries) {
	if err := q.DeleteAllBlogs(ctx); err != nil {
		log.Fatalf(ERROR_RESET_BLOGS, err)
	}
	if err := q.DeleteAllTags(ctx); err != nil {
		log.Fatalf(ERROR_RESET_TAGS, err)
	}
	if err := q.DeleteAllBlogsTags(ctx); err != nil {
		log.Fatalf(ERROR_RESET_BTT, err)
	}
}
