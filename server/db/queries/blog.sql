-- -- GETTERS -- --

-- name: GetBlogs :many
SELECT * FROM blogs LIMIT ? OFFSET ?;

-- name: GetPublishedBlogs :many
SELECT * FROM blogs WHERE published_at IS NOT NULL LIMIT ? OFFSET ?;

-- name: GetBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug IN (?)
  )
) LIMIT ? OFFSET ?;

-- name: GetPublishedBlogsByTagSlugs :many
SELECT * FROM blogs WHERE id IN (
  SELECT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug IN (?)
  )
) AND published_at IS NOT NULL LIMIT ? OFFSET ?;


-- -- COUNTERS -- --

-- name: GetBlogsCount :one
SELECT COUNT(*) FROM blogs;

-- name: GetPublishedBlogsCount :one
SELECT COUNT(*) FROM blogs WHERE published_at IS NOT NULL;

-- name: GetBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug IN (?)
);

-- name: GetPublishedBlogsByTagSlugsCount :one
SELECT COUNT(*) FROM blogs_tags WHERE tag_id IN (
  SELECT id FROM tags WHERE tags.slug IN (?)
) AND blog_id IN (
  SELECT id FROM blogs WHERE published_at IS NOT NULL
);

-- -- FINDERS -- --

-- name: GetBlogBySlug :one
SELECT * FROM blogs WHERE slug = ?;

-- name: GetPublishedBlogBySlug :one
SELECT * FROM blogs WHERE slug = ? AND published_at IS NOT NULL;

-- -- CREATORS -- --

-- name: CreateBlog :execresult
INSERT INTO blogs (
  title, slug, description, content, published_at
)
VALUES (?, ?, ?, ?, ?);

-- name: ConnectBlogTag :exec
INSERT INTO blogs_tags (blog_id, tag_id)
VALUES (?, ?);

-- name: CreateTag :execresult
INSERT INTO tags (
  name, slug
) VALUES (
  ?, ?
);

-- -- DELETORS -- --

-- name: DeleteAllBlogs :exec
DELETE FROM blogs;

-- name: DeleteAllBlogsTags :exec
DELETE FROM blogs_tags;

-- name: DeleteAllTags :exec
DELETE FROM tags;

