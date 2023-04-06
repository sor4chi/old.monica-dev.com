FILE_DIR=$(dirname "$0")
cd $FILE_DIR

# launch dev server
docker-compose up -d --build

sleep 10

# migrate db
sh dev-migrate.sh

# seed db
sh dev-seed.sh
