# Backend
FROM node:14 as backend

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend .

EXPOSE 5000

# Frontend
FROM node:14 as frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

EXPOSE 3000

# Docker Compose
FROM backend as dev-backend
CMD ["npm", "run", "dev"]

FROM frontend as dev-frontend
CMD ["npm", "start"]