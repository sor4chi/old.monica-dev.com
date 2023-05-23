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

-- -- UPDATERS -- --

-- name: UpdateTimeline :one
UPDATE timelines
SET title = $1, related_blog_id = $2, category = $3, date = $4
WHERE id = $5
RETURNING *;

-- -- DELETORS -- --

-- name: DeleteTimeline :exec
DELETE FROM timelines WHERE id = $1;

-- name: DeleteAllTimelines :exec
DELETE FROM timelines;
