-- migrate:up
CREATE TABLE timelines (
  id SERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category INTEGER NOT NULL,
  from_date TIMESTAMPTZ NOT NULL,
  to_date TIMESTAMPTZ NOT NULL
);

CREATE INDEX timelines_category_idx ON timelines (category);

-- migrate:down
DROP TABLE timelines;

