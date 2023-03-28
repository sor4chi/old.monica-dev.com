package util

import "net/http"

type Middleware func(http.Handler) http.Handler

type MiddlewareManager struct {
	middlewares []Middleware
}

func NewMiddlewareManager() *MiddlewareManager {
	return &MiddlewareManager{
		middlewares: []Middleware{},
	}
}

func (m *MiddlewareManager) Use(middleware Middleware) {
	m.middlewares = append(m.middlewares, middleware)
}

func (m *MiddlewareManager) Middleware(handler http.Handler) http.Handler {
	for _, middleware := range m.middlewares {
		handler = middleware(handler)
	}
	return handler
}



