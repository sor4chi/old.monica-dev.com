-- -- GETTERS -- --

-- name: GetAllTimelines :many
SELECT * FROM timelines;

-- name: GetTimelinesByCategories :many
SELECT * FROM timelines WHERE category = ANY (@categories::int[]);

-- -- CREATORS -- --

-- name: CreateTimeline :one
INSERT INTO timelines (title, related_blog_id, category, date)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- -- DELETORS -- --

-- name: DeleteAllTimelines :exec
DELETE FROM timelines;
