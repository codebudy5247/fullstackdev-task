> Doctor App

# How to run this app:

### BACKEND
```
cd backend
npm install
docker compose up -d {Run mysql instance on docker container}

create .env file
NODE_ENV=development
PORT=1337
ORIGIN=http://localhost:3000
MYSQL_DATABASE=doctor-app-db
MYSQL_USER=admin
MYSQL_PASSWORD=password123
MYSQL_ROOT_PASSWORD=password123
DATABASE_URL=mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@localhost:6500/${MYSQL_DATABASE}
JWT_SECRET=secret

npm run dev

```

### FRONTEND

```
cd frontend
npm install
npm run dev
```
