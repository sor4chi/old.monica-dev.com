-- migrate:up
CREATE TABLE blogs (
  id int not null auto_increment primary key comment 'blog id',
  title varchar(255) not null comment 'blog title',
  description varchar(255) not null comment 'blog description',
  slug varchar(255) not null unique comment 'blog slug',
  content text not null comment 'blog content',
  created_at datetime not null comment 'blog created at',
  updated_at datetime not null comment 'blog updated at',
  published_at datetime comment 'blog published at, null if not published'
);

ALTER TABLE blogs ADD INDEX idx_blogs_slug_published_at (slug, published_at);

-- migrate:down
DROP TABLE blogs;
