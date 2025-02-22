# base
FROM node:19-alpine AS base
WORKDIR /app
COPY /frontend/package*.json .
RUN npm install
COPY /frontend/* .


FROM base as builder
WORKDIR /app
RUN ls
RUN npm run build


FROM node:19-alpine
WORKDIR /app
COPY /frontend/package*.json .
COPY --from=builder /app/dist .
WORKDIR /app/frontend
RUN npm install --only=production

EXPOSE 3000

RUN npm run start