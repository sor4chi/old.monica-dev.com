package middleware

import (
	"net/http"
	"regexp"

	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	ALLOW_ORIGIN_REGEX = util.GetEnv("ALLOW_ORIGIN_REGEX", "^http://localhost:3000(.?)$")
)

func CorsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if regexp.MustCompile(ALLOW_ORIGIN_REGEX).MatchString(r.Header.Get("Origin")) {
			w.Header().Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
		}
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "accept, content-type, content-length, accept-encoding, x-csrf-token, authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
