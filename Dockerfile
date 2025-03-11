# base
FROM node:19-alpine AS base
WORKDIR /usr/src/app
COPY /frontend/package*.json ./
RUN npm install --only=production


FROM base AS build
COPY /frontend/ ./
RUN npm install
RUN npm run build


FROM base AS release
COPY --from=build /usr/src/app/ ./
EXPOSE 3000
#COPY /frontend/.env ./
CMD ["npm", "run", "-e", "NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST", "-e", "NEXT_PUBLIC_API_PORT=$NEXT_PUBLIC_API_PORT", "start"]