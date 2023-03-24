// Code generated by ent, DO NOT EDIT.

package blog

import (
	"time"
)

const (
	// Label holds the string label denoting the blog type in the database.
	Label = "blog"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldSlug holds the string denoting the slug field in the database.
	FieldSlug = "slug"
	// FieldDescription holds the string denoting the description field in the database.
	FieldDescription = "description"
	// FieldContent holds the string denoting the content field in the database.
	FieldContent = "content"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// FieldPublishedAt holds the string denoting the published_at field in the database.
	FieldPublishedAt = "published_at"
	// EdgeTags holds the string denoting the tags edge name in mutations.
	EdgeTags = "tags"
	// Table holds the table name of the blog in the database.
	Table = "blogs"
	// TagsTable is the table that holds the tags relation/edge. The primary key declared below.
	TagsTable = "tag_blogs"
	// TagsInverseTable is the table name for the Tag entity.
	// It exists in this package in order to avoid circular dependency with the "tag" package.
	TagsInverseTable = "tags"
)

// Columns holds all SQL columns for blog fields.
var Columns = []string{
	FieldID,
	FieldTitle,
	FieldSlug,
	FieldDescription,
	FieldContent,
	FieldCreatedAt,
	FieldUpdatedAt,
	FieldPublishedAt,
}

var (
	// TagsPrimaryKey and TagsColumn2 are the table columns denoting the
	// primary key for the tags relation (M2M).
	TagsPrimaryKey = []string{"tag_id", "blog_id"}
)

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// TitleValidator is a validator for the "title" field. It is called by the builders before save.
	TitleValidator func(string) error
	// SlugValidator is a validator for the "slug" field. It is called by the builders before save.
	SlugValidator func(string) error
	// DescriptionValidator is a validator for the "description" field. It is called by the builders before save.
	DescriptionValidator func(string) error
	// ContentValidator is a validator for the "content" field. It is called by the builders before save.
	ContentValidator func(string) error
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
)