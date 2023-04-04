package service

import (
	"encoding/json"
	"net/http"

	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	password = util.GetEnv("ADMIN_PASSWORD", "") // password must be encrypted by bcrypt
	// IS_DEV   = util.GetEnv("ENV", "production") == "development"
)

type LoginResponse struct {
	SessionId string `json:"session_id"`
}

func UserLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		return
	}
	param := struct {
		Password string `json:"password"`
	}{}
	err := json.NewDecoder(r.Body).Decode(&param)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	if password == "" {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	if !CompareHashPassword(password, param.Password) {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	sessionId := GenerateRandomString(32)
	Sessions[sessionId] = "admin"

	cookie := http.Cookie{
		Name:     "session_id",
		Value:    sessionId,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
	}
	http.SetCookie(w, &cookie)
	w.WriteHeader(http.StatusOK)
}

func UserLogout(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		return
	}
	cookie, err := r.Cookie("session_id")
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	delete(Sessions, cookie.Value)
	cookie.MaxAge = -1
	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
}
