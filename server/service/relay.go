package service

import "gorm.io/gorm"

func NewRelayConnection(db *gorm.DB, first *int, last *int, before *string, after *string) *RelayConnection {
	return &RelayConnection{
		db:     db,
		first:  first,
		last:   last,
		before: before,
		after:  after,
	}
}

type RelayConnection struct {
	db     *gorm.DB
	first  *int
	last   *int
	before *string
	after  *string
}

func (r *RelayConnection) Apply(query *gorm.DB) *gorm.DB {
	if r.first != nil {
		query = query.Limit(*r.first)
	}
	if r.last != nil {
		query = query.Limit(*r.last)
	}
	if r.before != nil {
		query = query.Where("id < ?", *r.before)
	}
	if r.after != nil {
		query = query.Where("id > ?", *r.after)
	}
	return query
}

func (r *RelayConnection) GetTotalCount(query *gorm.DB) (int64, error) {
	var count int64
	err := query.Count(&count).Error
	return count, err
}

func (r *RelayConnection) GetEdges(query *gorm.DB) (*RelayConnectionEdges, error) {
	var edges RelayConnectionEdges
	err := query.Find(&edges).Error
	return &edges, err
}

type RelayConnectionEdges struct {
	Edges []RelayConnectionEdge
}

type RelayConnectionEdge struct {
	Cursor string
	Node   interface{}
}

func (r *RelayConnectionEdges) AddEdge(cursor string, node interface{}) {
	r.Edges = append(r.Edges, RelayConnectionEdge{
		Cursor: cursor,
		Node:   node,
	})
}

func (r *RelayConnectionEdges) GetFirstEdge() *RelayConnectionEdge {
	if len(r.Edges) == 0 {
		return nil
	}
	return &r.Edges[0]
}

func (r *RelayConnectionEdges) GetLastEdge() *RelayConnectionEdge {
	if len(r.Edges) == 0 {
		return nil
	}
	return &r.Edges[len(r.Edges)-1]
}

func (r *RelayConnectionEdges) GetFirstCursor() *string {
	if len(r.Edges) == 0 {
		return nil
	}
	return &r.Edges[0].Cursor
}

func (r *RelayConnectionEdges) GetLastCursor() *string {
	if len(r.Edges) == 0 {
		return nil
	}
	return &r.Edges[len(r.Edges)-1].Cursor
}

func (r *RelayConnectionEdges) GetFirstNode() interface{} {
	if len(r.Edges) == 0 {
		return nil
	}
	return r.Edges[0].Node
}

func (r *RelayConnectionEdges) GetLastNode() interface{} {
	if len(r.Edges) == 0 {
		return nil
	}
	return r.Edges[len(r.Edges)-1].Node
}

type RelayConnectionPageInfo struct {
	HasNextPage     bool
	HasPreviousPage bool
	StartCursor     *string
	EndCursor       *string
}

func (r *RelayConnectionPageInfo) SetHasNextPage(hasNextPage bool) {
	r.HasNextPage = hasNextPage
}

func (r *RelayConnectionPageInfo) SetHasPreviousPage(hasPreviousPage bool) {
	r.HasPreviousPage = hasPreviousPage
}

