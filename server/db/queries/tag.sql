-- -- GETTERS -- --

-- name: GetTagsByBlogId :many
SELECT * FROM tags WHERE id IN (
    SELECT tag_id FROM blogs_tags WHERE blog_id = $1
);

-- -- FINDS -- --

-- name: GetTagBySlug :one
SELECT * FROM tags WHERE slug = $1;
