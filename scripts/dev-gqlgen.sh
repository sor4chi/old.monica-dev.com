FILE_DIR=$(dirname "$0")

cd $FILE_DIR/..

docker-compose run --rm go go generate ./...
