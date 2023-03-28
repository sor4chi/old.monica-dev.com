package seed

import (
	"context"
	"log"
	"path/filepath"
	"time"

	"github.com/gosimple/slug"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/util"
	"gorm.io/gorm"
)

var (
	WD                    = util.GetEnv("PWD", ".")
	BLOG_FIXTURE_PATH     = filepath.Join(WD, "db/seed/fixtures/blogs.json")
	MAX_TAGS              = 3
	ERROR_CREATE_BLOG     = "failed creating blog: %v"
	ERROR_DELETE_BLOG_TAG = "failed deleting blog tag: %v"
	ERROR_CREATE_TAG      = "failed creating tag: %v"
	ERROR_LOAD_JSON       = "failed loading dummy data: %v"
	ERROR_DELETE_BLOG     = "failed deleting blog: %v"
	ERROR_DELETE_TAG      = "failed deleting tag: %v"
)

type Input struct {
	Title       string   `json:"title"`
	Slug        string   `json:"slug"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Tags        []string `json:"tags"`
}

func SeedBlog(ctx context.Context, client *gorm.DB) {
	var dumies []Input

	if err := util.LoadJSON(BLOG_FIXTURE_PATH, &dumies); err != nil {
		log.Fatalf(ERROR_LOAD_JSON, err)
	}

	for i := 0; i < len(dumies); i++ {
		tags := []*entity.Tag{}
		for _, t := range dumies[i].Tags {
			s := slug.Make(t)
			tag := &entity.Tag{
				Name: t,
				Slug: s,
			}
			var existingTag entity.Tag
			if err := client.Where("slug = ?", tag.Slug).FirstOrCreate(&existingTag, tag).Error; err != nil {
				log.Fatalf(ERROR_CREATE_TAG, err)
			}
			tags = append(tags, &existingTag)
		}

		record := &entity.Blog{
			Title:       dumies[i].Title,
			Slug:        dumies[i].Slug,
			Description: dumies[i].Description,
			Content:     dumies[i].Content,
			Tags:        tags,
			PublishedAt: time.Now(),
		}

		if err := client.Create(record).Error; err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}
	}
}

func ResetBlog(ctx context.Context, client *gorm.DB) {
	if err := client.Exec("DELETE FROM blog_tags").Error; err != nil {
		log.Fatalf(ERROR_DELETE_BLOG_TAG, err)
	}
	if err := client.Exec("DELETE FROM blogs").Error; err != nil {
		log.Fatalf(ERROR_DELETE_BLOG, err)
	}
	if err := client.Exec("DELETE FROM tags").Error; err != nil {
		log.Fatalf(ERROR_DELETE_TAG, err)
	}
}
