// Code generated by ent, DO NOT EDIT.

package ent

import (
	"fmt"
	"strings"
	"time"

	"entgo.io/ent/dialect/sql"
	"github.com/sor4chi/portfolio-blog/server/ent/blog"
)

// Blog is the model entity for the Blog schema.
type Blog struct {
	config `json:"-"`
	// ID of the ent.
	ID int `json:"id,omitempty"`
	// ブログのタイトル
	Title string `json:"title,omitempty"`
	// ブログのスラッグ、URLのパラメータとして使用
	Slug string `json:"slug,omitempty"`
	// ブログの説明
	Description string `json:"description,omitempty"`
	// ブログの本文
	Content string `json:"content,omitempty"`
	// ブログの作成日時
	CreatedAt time.Time `json:"created_at,omitempty"`
	// ブログの更新日時
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	// ブログの公開日時、公開されていない場合はnull
	PublishedAt *time.Time `json:"published_at,omitempty"`
	// Edges holds the relations/edges for other nodes in the graph.
	// The values are being populated by the BlogQuery when eager-loading is set.
	Edges BlogEdges `json:"edges"`
}

// BlogEdges holds the relations/edges for other nodes in the graph.
type BlogEdges struct {
	// Tags holds the value of the tags edge.
	Tags []*Tag `json:"tags,omitempty"`
	// loadedTypes holds the information for reporting if a
	// type was loaded (or requested) in eager-loading or not.
	loadedTypes [1]bool
	// totalCount holds the count of the edges above.
	totalCount [1]map[string]int

	namedTags map[string][]*Tag
}

// TagsOrErr returns the Tags value or an error if the edge
// was not loaded in eager-loading.
func (e BlogEdges) TagsOrErr() ([]*Tag, error) {
	if e.loadedTypes[0] {
		return e.Tags, nil
	}
	return nil, &NotLoadedError{edge: "tags"}
}

// scanValues returns the types for scanning values from sql.Rows.
func (*Blog) scanValues(columns []string) ([]any, error) {
	values := make([]any, len(columns))
	for i := range columns {
		switch columns[i] {
		case blog.FieldID:
			values[i] = new(sql.NullInt64)
		case blog.FieldTitle, blog.FieldSlug, blog.FieldDescription, blog.FieldContent:
			values[i] = new(sql.NullString)
		case blog.FieldCreatedAt, blog.FieldUpdatedAt, blog.FieldPublishedAt:
			values[i] = new(sql.NullTime)
		default:
			return nil, fmt.Errorf("unexpected column %q for type Blog", columns[i])
		}
	}
	return values, nil
}

// assignValues assigns the values that were returned from sql.Rows (after scanning)
// to the Blog fields.
func (b *Blog) assignValues(columns []string, values []any) error {
	if m, n := len(values), len(columns); m < n {
		return fmt.Errorf("mismatch number of scan values: %d != %d", m, n)
	}
	for i := range columns {
		switch columns[i] {
		case blog.FieldID:
			value, ok := values[i].(*sql.NullInt64)
			if !ok {
				return fmt.Errorf("unexpected type %T for field id", value)
			}
			b.ID = int(value.Int64)
		case blog.FieldTitle:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field title", values[i])
			} else if value.Valid {
				b.Title = value.String
			}
		case blog.FieldSlug:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field slug", values[i])
			} else if value.Valid {
				b.Slug = value.String
			}
		case blog.FieldDescription:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field description", values[i])
			} else if value.Valid {
				b.Description = value.String
			}
		case blog.FieldContent:
			if value, ok := values[i].(*sql.NullString); !ok {
				return fmt.Errorf("unexpected type %T for field content", values[i])
			} else if value.Valid {
				b.Content = value.String
			}
		case blog.FieldCreatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field created_at", values[i])
			} else if value.Valid {
				b.CreatedAt = value.Time
			}
		case blog.FieldUpdatedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field updated_at", values[i])
			} else if value.Valid {
				b.UpdatedAt = value.Time
			}
		case blog.FieldPublishedAt:
			if value, ok := values[i].(*sql.NullTime); !ok {
				return fmt.Errorf("unexpected type %T for field published_at", values[i])
			} else if value.Valid {
				b.PublishedAt = new(time.Time)
				*b.PublishedAt = value.Time
			}
		}
	}
	return nil
}

// QueryTags queries the "tags" edge of the Blog entity.
func (b *Blog) QueryTags() *TagQuery {
	return NewBlogClient(b.config).QueryTags(b)
}

// Update returns a builder for updating this Blog.
// Note that you need to call Blog.Unwrap() before calling this method if this Blog
// was returned from a transaction, and the transaction was committed or rolled back.
func (b *Blog) Update() *BlogUpdateOne {
	return NewBlogClient(b.config).UpdateOne(b)
}

// Unwrap unwraps the Blog entity that was returned from a transaction after it was closed,
// so that all future queries will be executed through the driver which created the transaction.
func (b *Blog) Unwrap() *Blog {
	_tx, ok := b.config.driver.(*txDriver)
	if !ok {
		panic("ent: Blog is not a transactional entity")
	}
	b.config.driver = _tx.drv
	return b
}

// String implements the fmt.Stringer.
func (b *Blog) String() string {
	var builder strings.Builder
	builder.WriteString("Blog(")
	builder.WriteString(fmt.Sprintf("id=%v, ", b.ID))
	builder.WriteString("title=")
	builder.WriteString(b.Title)
	builder.WriteString(", ")
	builder.WriteString("slug=")
	builder.WriteString(b.Slug)
	builder.WriteString(", ")
	builder.WriteString("description=")
	builder.WriteString(b.Description)
	builder.WriteString(", ")
	builder.WriteString("content=")
	builder.WriteString(b.Content)
	builder.WriteString(", ")
	builder.WriteString("created_at=")
	builder.WriteString(b.CreatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	builder.WriteString("updated_at=")
	builder.WriteString(b.UpdatedAt.Format(time.ANSIC))
	builder.WriteString(", ")
	if v := b.PublishedAt; v != nil {
		builder.WriteString("published_at=")
		builder.WriteString(v.Format(time.ANSIC))
	}
	builder.WriteByte(')')
	return builder.String()
}

// NamedTags returns the Tags named value or an error if the edge was not
// loaded in eager-loading with this name.
func (b *Blog) NamedTags(name string) ([]*Tag, error) {
	if b.Edges.namedTags == nil {
		return nil, &NotLoadedError{edge: name}
	}
	nodes, ok := b.Edges.namedTags[name]
	if !ok {
		return nil, &NotLoadedError{edge: name}
	}
	return nodes, nil
}

func (b *Blog) appendNamedTags(name string, edges ...*Tag) {
	if b.Edges.namedTags == nil {
		b.Edges.namedTags = make(map[string][]*Tag)
	}
	if len(edges) == 0 {
		b.Edges.namedTags[name] = []*Tag{}
	} else {
		b.Edges.namedTags[name] = append(b.Edges.namedTags[name], edges...)
	}
}

// Blogs is a parsable slice of Blog.
type Blogs []*Blog