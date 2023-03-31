-- name: GetTagsBySlugs :many
SELECT * FROM tags WHERE slug IN (?);
