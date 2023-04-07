-- -- GETTERS -- --

-- name: GetTagsByBlogId :many
SELECT * FROM tags WHERE id IN (
    SELECT tag_id FROM blogs_tags WHERE blog_id = $1
);

-- -- FINDS -- --

-- name: GetTagBySlug :one
SELECT * FROM tags WHERE slug = $1;

-- -- CREATORS -- --

-- name: CreateTag :one
INSERT INTO tags (name, slug) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;

-- name: CreateBlogTag :exec
INSERT INTO blogs_tags (blog_id, tag_id)
VALUES ($1, $2);
