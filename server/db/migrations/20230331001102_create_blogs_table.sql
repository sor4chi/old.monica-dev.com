-- migrate:up
CREATE TABLE blogs (
  id SERIAL NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TIMESTAMPTZ
);

CREATE INDEX blogs_slug_published_at_index ON blogs (slug, published_at);

CREATE TRIGGER refresh_blogs_updated_at_step1
  BEFORE UPDATE ON blogs FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step1();
CREATE TRIGGER refresh_blogs_updated_at_step2
  BEFORE UPDATE OF updated_at ON blogs FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step2();
CREATE TRIGGER refresh_blogs_updated_at_step3
  BEFORE UPDATE ON blogs FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step3();

-- migrate:down
DROP TABLE blogs;
