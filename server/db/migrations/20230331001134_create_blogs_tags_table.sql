-- migrate:up
CREATE TABLE blogs_tags (
  blog_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (blog_id, tag_id)
);

CREATE INDEX blog_id_tag_id_index ON blogs_tags (blog_id, tag_id);
ALTER TABLE blogs_tags ADD CONSTRAINT fk_blogs_tags_tag_id FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE blogs_tags ADD CONSTRAINT fk_blogs_tags_blog_id FOREIGN KEY (blog_id) REFERENCES blogs (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- migrate:down
DROP TABLE blogs_tags;
