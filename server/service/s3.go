package service

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/sor4chi/portfolio-blog/server/util"
)

var (
	BUCKET            = util.GetEnvStrict("S3_BUCKET")
	ACCESS_KEY_ID     = util.GetEnvStrict("AWS_ACCESS_KEY_ID")
	SECRET_ACCESS_KEY = util.GetEnvStrict("AWS_SECRET_ACCESS_KEY")
)

func NewSession() *session.Session {
	return session.Must(session.NewSession(
		&aws.Config{
			Region: aws.String("ap-northeast-1"),
			Credentials: credentials.NewStaticCredentials(
				ACCESS_KEY_ID,
				SECRET_ACCESS_KEY,
				"",
			),
		},
	))
}

func uploadFile(sess *session.Session, bucket string, key string, body []byte) (string, error) {
	uploader := s3manager.NewUploader(sess)
	output, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   bytes.NewReader(body),
		ACL:    aws.String("public-read"),
	})
	if err != nil {
		return "", err
	}
	return output.Location, nil
}

type UploadResponse struct {
	Url string `json:"url"`
}

func normalizeFileName(name string) string {
	return strings.Replace(name, " ", "_", -1)
}

func Upload(w http.ResponseWriter, r *http.Request) {
	sess := NewSession()
	r.ParseMultipartForm(32 << 20)
	file, handler, err := r.FormFile("file")
	if err != nil {
		log.Println(err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}
	defer file.Close()
	key := "blog/" + normalizeFileName(handler.Filename)
	body := make([]byte, handler.Size)
	file.Read(body)
	url, err := uploadFile(sess, BUCKET, key, body)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	res := UploadResponse{Url: url}
	json.NewEncoder(w).Encode(res)
}
