-- name: GetAllBlogs :many
SELECT * FROM blogs ORDER BY created_at DESC LIMIT $1 OFFSET $2;

-- name: GetAllBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
  )
) ORDER BY created_at DESC LIMIT $1 OFFSET $2;

-- name: GetPublishedBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
  )
) AND published_at IS NOT NULL ORDER BY published_at DESC LIMIT $1 OFFSET $2;

-- name: GetPublishedBlogs :many
SELECT * FROM blogs WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT $1 OFFSET $2;

-- -- COUNTERS -- --

-- name: GetAllBlogsCount :one
SELECT COUNT(*) FROM blogs;

-- name: GetAllBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
);

-- name: GetPublishedBlogsCount :one
SELECT COUNT(*) FROM blogs WHERE published_at IS NOT NULL;

-- name: GetPublishedBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
) AND blog_id IN (
  SELECT id FROM blogs WHERE published_at IS NOT NULL
);

-- -- FINDERS -- --

-- name: GetBlogById :one
SELECT * FROM blogs WHERE id = $1;

-- name: GetPublishedBlogBySlug :one
SELECT * FROM blogs WHERE slug = $1 AND published_at IS NOT NULL;

-- -- CREATORS -- --

-- name: CreateBlog :one
INSERT INTO blogs (
  title, slug, description, content, published_at
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- -- UPDATERS -- --

-- name: UpdateBlog :one
UPDATE blogs
SET title = $1, slug = $2, description = $3, content = $4, published_at = $5
WHERE id = $6
RETURNING *;

-- -- DELETORS -- --

-- name: DeleteAllBlogs :exec
DELETE FROM blogs;

-- name: DeleteAllBlogsTags :exec
DELETE FROM blogs_tags;

-- name: DeleteAllTags :exec
DELETE FROM tags;

