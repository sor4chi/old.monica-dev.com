FILE_DIR=$(dirname "$0")

cd $FILE_DIR/../server

sqlc generate
