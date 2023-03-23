package schema

import "entgo.io/ent"

// Blog holds the schema definition for the Blog entity.
type Blog struct {
	ent.Schema
}

// Fields of the Blog.
func (Blog) Fields() []ent.Field {
	return nil
}

// Edges of the Blog.
func (Blog) Edges() []ent.Edge {
	return nil
}
