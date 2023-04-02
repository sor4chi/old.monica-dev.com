-- -- GETTERS -- --

-- name: GetBlogs :many
SELECT * FROM blogs LIMIT $1 OFFSET $2;

-- name: GetPublishedBlogs :many
SELECT * FROM blogs WHERE published_at IS NOT NULL LIMIT $1 OFFSET $2;

-- name: GetBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
  )
) LIMIT $1 OFFSET $2;

-- name: GetPublishedBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
  )
) AND published_at IS NOT NULL LIMIT $1 OFFSET $2;


-- -- COUNTERS -- --

-- name: GetBlogsCount :one
SELECT COUNT(*) FROM blogs;

-- name: GetPublishedBlogsCount :one
SELECT COUNT(*) FROM blogs WHERE published_at IS NOT NULL;

-- name: GetBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
);

-- name: GetPublishedBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug = ANY (@slugs::text[])
) AND blog_id IN (
  SELECT id FROM blogs WHERE published_at IS NOT NULL
);

-- -- FINDERS -- --

-- name: GetBlogBySlug :one
SELECT * FROM blogs WHERE slug = $1;

-- name: GetPublishedBlogBySlug :one
SELECT * FROM blogs WHERE slug = $1 AND published_at IS NOT NULL;

-- -- CREATORS -- --

-- name: CreateBlog :one
INSERT INTO blogs (
  title, slug, description, content, published_at
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ConnectBlogTag :exec
INSERT INTO blogs_tags (blog_id, tag_id)
VALUES ($1, $2);

-- name: CreateTag :one
INSERT INTO tags (
  name, slug
) VALUES (
  $1, $2
) RETURNING *;

-- -- DELETORS -- --

-- name: DeleteAllBlogs :exec
DELETE FROM blogs;

-- name: DeleteAllBlogsTags :exec
DELETE FROM blogs_tags;

-- name: DeleteAllTags :exec
DELETE FROM tags;

