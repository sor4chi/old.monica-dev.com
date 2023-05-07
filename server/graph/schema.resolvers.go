package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.27

import (
	"context"
	"strconv"

	"github.com/sor4chi/portfolio-blog/server/entity"
	"github.com/sor4chi/portfolio-blog/server/graph/model"
	"github.com/sor4chi/portfolio-blog/server/service"
)

// Tags is the resolver for the tags field.
func (r *blogResolver) Tags(ctx context.Context, obj *model.Blog) ([]*model.Tag, error) {
	ts := service.NewTagService(r.Q)

	id, err := strconv.ParseInt(obj.ID, 10, 32)
	if err != nil {
		return nil, err
	}
	tags, err := ts.GetTagsByBlogId(int32(id))
	if err != nil {
		return nil, err
	}

	return model.NewTagsFromEntityList(tags), nil
}

// CreateBlog is the resolver for the createBlog field.
func (r *mutationResolver) CreateBlog(ctx context.Context, input model.BlogInput) (*model.Blog, error) {
	bs := service.NewBlogService(r.Q)
	ts := service.NewTagService(r.Q)

	blog, err := bs.CreateBlog(
		input.Title,
		input.Slug,
		input.Description,
		input.Content,
		input.Published,
	)
	if err != nil {
		return nil, err
	}

	var tagIds []int32
	for _, id := range input.TagIds {
		intId, err := strconv.ParseInt(id, 10, 32)
		if err != nil {
			return nil, err
		}
		tagIds = append(tagIds, int32(intId))
	}

	err = ts.CreateBlogTags(blog.ID, tagIds)
	if err != nil {
		return nil, err
	}

	if blog.PublishedAt != nil {
		err = bs.RevalidateBlog(blog.Slug)
		if err != nil {
			return nil, err
		}
	}

	return model.NewBlogFromEntity(blog), nil
}

// UpdateBlog is the resolver for the updateBlog field.
func (r *mutationResolver) UpdateBlog(ctx context.Context, id string, input model.BlogInput) (*model.Blog, error) {
	bs := service.NewBlogService(r.Q)
	ts := service.NewTagService(r.Q)

	intId, err := strconv.ParseInt(id, 10, 32)
	if err != nil {
		return nil, err
	}

	blog, err := bs.UpdateBlog(
		int32(intId),
		input.Title,
		input.Slug,
		input.Description,
		input.Content,
		input.Published,
	)
	if err != nil {
		return nil, err
	}

	err = ts.DeleteBlogTagByBlogId(blog.ID)
	if err != nil {
		return nil, err
	}

	var tagIds []int32
	for _, id := range input.TagIds {
		intId, err := strconv.ParseInt(id, 10, 32)
		if err != nil {
			return nil, err
		}
		tagIds = append(tagIds, int32(intId))
	}

	err = ts.CreateBlogTags(blog.ID, tagIds)
	if err != nil {
		return nil, err
	}

	err = bs.RevalidateBlog(blog.Slug)
	if err != nil {
		return nil, err
	}

	return model.NewBlogFromEntity(blog), nil
}

// DeleteBlog is the resolver for the deleteBlog field.
func (r *mutationResolver) DeleteBlog(ctx context.Context, id string) (*model.Blog, error) {
	panic("DeleteBlog is not implemented")
}

// CreateTag is the resolver for the createTag field.
func (r *mutationResolver) CreateTag(ctx context.Context, input model.TagInput) (*model.Tag, error) {
	ts := service.NewTagService(r.Q)

	tag, err := ts.CreateTag(&entity.Tag{
		Name: input.Name,
		Slug: input.Slug,
	})
	if err != nil {
		return nil, err
	}

	return model.NewTagFromEntity(tag), nil
}

// CreateTimeline is the resolver for the createTimeline field.
func (r *mutationResolver) CreateTimeline(ctx context.Context, input model.TimelineInput) (*model.Timeline, error) {
	ts := service.NewTimelineService(r.Q)

	// if relatedBlogID is nil, set it to nil
	var relatedBlogID *int32

	if input.RelatedBlogID != nil {
		intId, err := strconv.ParseInt(*input.RelatedBlogID, 10, 32)
		if err != nil {
			return nil, err
		}
		tmpId := int32(intId)
		relatedBlogID = &tmpId
	} else {
		relatedBlogID = nil
	}

	timeline, err := ts.CreateTimeline(
		input.Title,
		relatedBlogID,
		input.Category,
		input.Date,
	)
	if err != nil {
		return nil, err
	}

	return model.NewTimelineFromEntity(timeline), nil
}

// Blogs is the resolver for the blogs field.
func (r *queryResolver) Blogs(ctx context.Context, input model.BlogListInput) (*model.BlogList, error) {
	bs := service.NewBlogService(r.Q)
	var blogs []*entity.Blog
	var total int
	var err error

	if len(input.Tags) > 0 {
		blogs, total, err = bs.GetPublishedBlogsByTagSlugs(input.Limit, input.Offset, input.Tags)
	} else {
		blogs, total, err = bs.GetPublishedBlogs(input.Limit, input.Offset)
	}

	if err != nil {
		return nil, err
	}

	return &model.BlogList{
		Total: int(total),
		Data:  model.NewBlogsFromEntityList(blogs),
	}, nil
}

// Blog is the resolver for the blog field.
func (r *queryResolver) Blog(ctx context.Context, slug string) (*model.Blog, error) {
	bs := service.NewBlogService(r.Q)
	b, err := bs.GetPublishedBlogBySlug(slug)
	if err != nil {
		return nil, err
	}

	return model.NewBlogFromEntity(b), nil
}

// BlogsAll is the resolver for the blogsAll field.
func (r *queryResolver) BlogsAll(ctx context.Context, input model.BlogListInput) (*model.BlogList, error) {
	bs := service.NewBlogService(r.Q)
	var blogs []*entity.Blog
	var total int
	var err error

	if len(input.Tags) > 0 {
		blogs, total, err = bs.GetAllBlogsByTagSlugs(input.Limit, input.Offset, input.Tags)
	} else {
		blogs, total, err = bs.GetAllBlogs(input.Limit, input.Offset)
	}

	if err != nil {
		return nil, err
	}

	return &model.BlogList{
		Total: int(total),
		Data:  model.NewBlogsFromEntityList(blogs),
	}, nil
}

// BlogByID is the resolver for the blogById field.
func (r *queryResolver) BlogByID(ctx context.Context, id string) (*model.Blog, error) {
	bs := service.NewBlogService(r.Q)
	intId, err := strconv.ParseInt(id, 10, 32)
	if err != nil {
		return nil, err
	}
	b, err := bs.GetBlogById(int32(intId))
	if err != nil {
		return nil, err
	}

	return model.NewBlogFromEntity(b), nil
}

// Tags is the resolver for the tags field.
func (r *queryResolver) Tags(ctx context.Context) ([]*model.Tag, error) {
	ts := service.NewTagService(r.Q)
	tags, err := ts.GetTags()
	if err != nil {
		return nil, err
	}

	return model.NewTagsFromEntityList(tags), nil
}

// Timelines is the resolver for the timelines field.
func (r *queryResolver) Timelines(ctx context.Context) ([]*model.Timeline, error) {
	ts := service.NewTimelineService(r.Q)
	timelines, err := ts.GetTimelines()
	if err != nil {
		return nil, err
	}

	return model.NewTimelinesFromEntityList(timelines), nil
}

// Blog is the resolver for the blog field.
func (r *timelineResolver) Blog(ctx context.Context, obj *model.Timeline) (*model.Blog, error) {
	bs := service.NewBlogService(r.Q)
	// parse to int32
	if obj.RelatedBlogID == nil {
		return nil, nil
	}
	intId, err := strconv.ParseInt(*obj.RelatedBlogID, 10, 32)
	if err != nil {
		return nil, err
	}
	b, err := bs.GetBlogById(int32(intId))
	if err != nil {
		return nil, err
	}
	if b.PublishedAt == nil {
		return nil, nil
	}

	return model.NewBlogFromEntity(b), nil
}

// Blog returns BlogResolver implementation.
func (r *Resolver) Blog() BlogResolver { return &blogResolver{r} }

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Timeline returns TimelineResolver implementation.
func (r *Resolver) Timeline() TimelineResolver { return &timelineResolver{r} }

type blogResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type timelineResolver struct{ *Resolver }
