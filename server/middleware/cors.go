package middleware

import (
	"net/http"

	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	ALLOW_ORIGIN = util.GetEnv("ALLOW_ORIGIN", "http://localhost:3000")
)

func CorsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", ALLOW_ORIGIN)
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "accept, content-type, content-length, accept-encoding, x-csrf-token, authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}
