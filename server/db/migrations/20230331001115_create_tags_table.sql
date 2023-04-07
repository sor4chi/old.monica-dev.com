-- migrate:up
CREATE TABLE tags (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX tags_slug_index ON tags (slug);

CREATE TRIGGER refresh_tags_updated_at_step1
  BEFORE UPDATE ON tags FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step1();
CREATE TRIGGER refresh_tags_updated_at_step2
  BEFORE UPDATE OF updated_at ON tags FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step2();
CREATE TRIGGER refresh_tags_updated_at_step3
  BEFORE UPDATE ON tags FOR EACH ROW
  EXECUTE PROCEDURE refresh_updated_at_step3();


-- migrate:down
DROP TABLE tags;
