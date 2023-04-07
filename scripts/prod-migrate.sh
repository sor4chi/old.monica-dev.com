FILE_DIR=$(dirname "$0")
cd $FILE_DIR/server

FORWARDING_PORT=5433

flyctl proxy $FORWARDING_PORT --app monica-log-backend-db &

sleep 5

dbmate up

kill $(lsof -t -i:$FORWARDING_PORT)
