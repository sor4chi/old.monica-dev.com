docker-compose up -d --build

sleep 30

yarn prisma migrate dev
