-- name: GetBlogsWithTags :many
-- input: limit int, offset int
SELECT *
FROM blogs
LEFT JOIN blogs_tags ON blogs.id = blogs_tags.blog_id
LEFT JOIN tags ON blogs_tags.tag_id = tags.id
ORDER BY published_at DESC
LIMIT ?
OFFSET ?;

-- name: GetBlogsCount :one
SELECT COUNT(*)
FROM blogs;


-- name: GetPublishedBlogs :many
-- input: limit int, offset int
SELECT *
FROM blogs
WHERE published_at IS NOT NULL ORDER BY published_at DESC
LIMIT ?
OFFSET ?;

-- name: GetPublishedBlogsCount :one
SELECT COUNT(*)
FROM blogs
WHERE published_at IS NOT NULL;

-- name: GetPublishedBlogsByTagSlugs :many
-- input: []tags.slug
SELECT *
FROM blogs
WHERE published_at IS NOT NULL
AND blogs.id IN (
  SELECT blog_id
  FROM blogs_tags
  WHERE tag_id IN (
    SELECT id
    FROM tags
    WHERE tags.slug IN (?)
  )
)
ORDER BY published_at DESC
LIMIT ?
OFFSET ?;

-- name: GetPublishedBlogsByTagSlugsCount :one
-- input: []tags.slug
SELECT COUNT(*)
FROM blogs
WHERE published_at IS NOT NULL
AND blogs.id IN (
  SELECT blog_id
  FROM blogs_tags
  WHERE tag_id IN (
    SELECT id
    FROM tags
    WHERE tags.slug IN (?)
  )
);

-- name: GetPublishedBlogBySlug :one
-- input: blogs.slug
SELECT *
FROM blogs
WHERE published_at IS NOT NULL
AND slug = ?;

-- name: GetBlogBySlug :one
-- input: blogs.slug
SELECT *
FROM blogs
WHERE slug = ?;


