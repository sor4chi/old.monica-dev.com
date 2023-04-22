-- migrate:up
CREATE TABLE timelines (
  id SERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  related_blog_id INTEGER,
  category INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL
);

CREATE INDEX timelines_category_idx ON timelines (category);
ALTER TABLE blogs_tags ADD CONSTRAINT blogs_tags_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES blogs(id);

-- migrate:down
DROP TABLE timelines;

