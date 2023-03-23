package schema

import (
	"regexp"
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Blog holds the schema definition for the Blog entity.
type Blog struct {
	ent.Schema
}

// Fields of the Blog.
func (Blog) Fields() []ent.Field {
	return []ent.Field{
		field.String("title").
			NotEmpty().
			Comment("ブログのタイトル").
			MaxLen(64).
			Annotations(
				entgql.OrderField("TITLE"),
			),
		field.String("slug").
			NotEmpty().
			Unique().
			Match(regexp.MustCompile(`^[a-z0-9]+(?:-[a-z0-9]+)*$`)).
			MaxLen(64).
			Comment("ブログのスラッグ、URLのパラメータとして使用").
			Annotations(
				entgql.OrderField("SLUG"),
			),
		field.String("description").
			NotEmpty().
			Comment("ブログの説明").
			MaxLen(256).
			Annotations(
				entgql.OrderField("DESCRIPTION"),
			),
		field.String("content").
			NotEmpty().
			Comment("ブログの本文").
			Annotations(
				entgql.OrderField("CONTENT"),
			),
		field.Time("created_at").
			Default(time.Now).
			Immutable().
			Comment("ブログの作成日時").
			Annotations(
				entgql.OrderField("CREATED_AT"),
			),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now).
			Comment("ブログの更新日時").
			Annotations(
				entgql.OrderField("UPDATED_AT"),
			),
		field.Time("published_at").
			Optional().
			Nillable().
			Comment("ブログの公開日時、公開されていない場合はnull").
			Annotations(
				entgql.OrderField("PUBLISHED_AT"),
			),
	}
}

// Edges of the Blog.
func (Blog) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("tags", Tag.Type).
			Ref("blogs"),
	}
}

func (Blog) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate()),
	}
}
