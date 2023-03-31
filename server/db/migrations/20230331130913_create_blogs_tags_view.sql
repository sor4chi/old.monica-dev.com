-- migrate:up transaction:false
CREATE VIEW blogs_tags_view AS
SELECT
  b.id,
  b.title,
  b.slug,
  b.description,
  b.content,
  b.created_at,
  b.updated_at,
  b.published_at,
  t.id AS tag_id,
  t.slug AS tag_slug,
  t.name AS tag_name,
  t.created_at AS tag_created_at,
  t.updated_at AS tag_updated_at
FROM
  blogs AS b
  JOIN blogs_tags AS bt ON b.id = bt.blog_id
  JOIN tags AS t ON bt.tag_id = t.id;


-- migrate:down
DROP VIEW blogs_tags_view;
