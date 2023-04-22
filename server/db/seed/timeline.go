package seed

import (
	"context"
	"database/sql"
	"log"
	"path/filepath"
	"time"

	"github.com/sor4chi/portfolio-blog/server/sqlc"
	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	TIMELINE_FIXTURE_PATH = filepath.Join(util.GetEnv("PWD", "."), "db/seed/fixtures/timelines.json")
)

type TimelineInput struct {
	Title         string `json:"title"`
	Category      int32  `json:"category"`
	Date          string `json:"date"`
	RelatedBlogId *int32 `json:"related_blog_id"`
}

func SeedTimeline(ctx context.Context, q *sqlc.Queries) {
	var dumies []TimelineInput

	if err := util.LoadJSON(TIMELINE_FIXTURE_PATH, &dumies); err != nil {
		log.Fatalf(ERROR_LOAD_JSON, err)
	}

	for i := 0; i < len(dumies); i++ {
		t, err := time.Parse(time.RFC3339, dumies[i].Date)
		if err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}
		hasRelatedBlog := dumies[i].RelatedBlogId != nil
		relatedBlogId := sql.NullInt32{
			Valid: hasRelatedBlog,
		}
		if hasRelatedBlog {
			relatedBlogId.Int32 = *dumies[i].RelatedBlogId
		}
		_, err = q.CreateTimeline(ctx, sqlc.CreateTimelineParams{
			Title:         dumies[i].Title,
			Category:      dumies[i].Category,
			Date:          t,
			RelatedBlogID: relatedBlogId,
		})
		if err != nil {
			log.Fatalf(ERROR_CREATE_BLOG, err)
		}
	}

}

func ResetSeedTimeline(ctx context.Context, q *sqlc.Queries) {
	if err := q.DeleteAllTimelines(ctx); err != nil {
		log.Fatalf(ERROR_RESET_BLOGS, err)
	}
}
