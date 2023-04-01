-- migrate:up
CREATE TABLE tags (
  id int not null auto_increment primary key comment 'tag id',
  name varchar(255) not null comment 'tag name',
  slug varchar(255) not null unique comment 'tag slug',
  created_at datetime not null default current_timestamp comment 'tag created at',
  updated_at datetime not null default current_timestamp on update current_timestamp comment 'tag updated at'
);

ALTER TABLE tags ADD INDEX idx_tags_slug (slug);

-- migrate:down
DROP TABLE tags;

