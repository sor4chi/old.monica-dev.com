package schema

import (
	"regexp"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Tag holds the schema definition for the Tag entity.
type Tag struct {
	ent.Schema
}

// Fields of the Tag.
func (Tag) Fields() []ent.Field {
	return []ent.Field{
		field.String("name").
			NotEmpty().
			Comment("タグの名前").
			MaxLen(64).
			Annotations(
				entgql.OrderField("NAME"),
			),
		field.String("slug").
			NotEmpty().
			Unique().
			Match(regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)).
			MaxLen(64).
			Comment("タグのスラッグ、URLのパラメータとして使用").
			Annotations(
				entgql.OrderField("SLUG"),
			),
	}
}

// Edges of the Tag.
func (Tag) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("blogs", Blog.Type),
	}
}
