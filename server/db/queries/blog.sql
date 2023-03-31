-- -- GETTERS -- --

-- name: GetBlogs :many
SELECT bt.*
FROM (
  SELECT DISTINCT id FROM blogs LIMIT ? OFFSET ?
) AS d
JOIN blogs_tags_view AS bt ON d.id = bt.id;

-- name: GetPublishedBlogs :many
SELECT bt.*
FROM (
  SELECT DISTINCT id FROM blogs WHERE published_at IS NOT NULL LIMIT ? OFFSET ?
) AS d
JOIN blogs_tags_view AS bt ON d.id = bt.id;

-- name: GetBlogsByTagSlugs :many
SELECT bt.*
FROM (
  SELECT DISTINCT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug IN (?)
  ) LIMIT ? OFFSET ?
) AS d
JOIN blogs_tags_view AS bt ON d.blog_id = bt.id;

-- name: GetPublishedBlogsByTagSlugs :many
SELECT bt.*
FROM (
  SELECT DISTINCT blog_id FROM blogs_tags WHERE tag_id IN (
    SELECT id FROM tags WHERE tags.slug IN (?)
  ) AND blog_id IN (
    SELECT id FROM blogs WHERE published_at IS NOT NULL
  ) LIMIT ? OFFSET ?
) AS d
JOIN blogs_tags_view AS bt ON d.blog_id = bt.id;

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
SELECT *
FROM blogs_tags_view
WHERE slug = ?;

-- name: GetPublishedBlogBySlug :one
SELECT *
FROM blogs_tags_view
WHERE slug = ? AND published_at IS NOT NULL;

-- -- CREATORS -- --

-- name: CreateBlog :exec
INSERT INTO blogs (title, slug, description, content, published_at)
VALUES (?, ?, ?, ?, ?);

-- name: ConnectBlogTag :exec
INSERT INTO blogs_tags (blog_id, tag_id)
VALUES (?, ?);

