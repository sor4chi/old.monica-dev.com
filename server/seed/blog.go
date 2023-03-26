package seed

import (
	"context"
	"log"
	"math/rand"
	"path/filepath"
	"time"

	"github.com/gosimple/slug"
	"github.com/sor4chi/portfolio-blog/server/ent"
	"github.com/sor4chi/portfolio-blog/server/ent/tag"
	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	WD                = util.GetEnv("PWD", ".")
	BLOG_FIXTURE_PATH = filepath.Join(WD, "seed/fixtures/blogs.json")
	MAX_TAGS          = 3
	ERROR_CREATE_BLOG = "failed creating blog: %v"
	ERROR_CREATE_TAG  = "failed creating tag: %v"
	ERROR_LOAD_JSON   = "failed loading dummy data: %v"
	ERROR_DELETE_BLOG = "failed deleting blog: %v"
	ERROR_DELETE_TAG  = "failed deleting tag: %v"
)

type Blog struct {
	Title       string   `json:"title"`
	Slug        string   `json:"slug"`
	Description string   `json:"description"`
	Content     string   `json:"content"`
	Tags        []string `json:"tags"`
}

func SeedBlog(ctx context.Context, client *ent.Client) {
	var blogs []*ent.Blog
	var dumies []Blog

	if err := util.LoadJSON(BLOG_FIXTURE_PATH, &dumies); err != nil {
		log.Fatalf(ERROR_LOAD_JSON, err)
	}

	for i := 0; i < len(dumies); i++ {
		created, err := client.Blog.
			Create().
			SetTitle(dumies[i].Title).
			SetSlug(dumies[i].Slug).
			SetDescription(dumies[i].Description).
			SetContent(dumies[i].Content).
			SetPublishedAt(time.Now()).
			Save(ctx)

		if err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}
		blogs = append(blogs, created)
	}

	for i := 0; i < len(dumies); i++ {
		rand.Seed(time.Now().UnixNano())
		pick := rand.Intn(MAX_TAGS) + 1
		var blogIDs []int
		for j := 0; j < pick; j++ {
			id := blogs[rand.Intn(len(blogs))].ID
			if !util.Contains(blogIDs, id) {
				blogIDs = append(blogIDs, id)
			}
		}

		slug := slug.Make(dumies[i].Tags[0])
		if tag, err := client.Tag.
			Query().
			Where(tag.Slug(slug)).
			Only(ctx); err == nil {
			client.Tag.UpdateOne(tag).AddBlogIDs(blogIDs...).Exec(ctx)
			continue
		}

		if _, err := client.Tag.
			Create().
			SetName(dumies[i].Tags[0]).
			SetSlug(slug).
			AddBlogIDs(blogIDs...).
			Save(ctx); err != nil {
			log.Fatalf(ERROR_CREATE_TAG, err)
		}
	}
}

func ResetBlog(ctx context.Context, client *ent.Client) {
	if _, err := client.Blog.Delete().Exec(ctx); err != nil {
		log.Fatalf(ERROR_DELETE_BLOG, err)
	}
	if _, err := client.Tag.Delete().Exec(ctx); err != nil {
		log.Fatalf(ERROR_DELETE_TAG, err)
	}
}
