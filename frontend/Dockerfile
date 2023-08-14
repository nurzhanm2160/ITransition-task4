
FROM node:18-alpine AS builder

RUN apk add --no-cache npm

WORKDIR /frontend 

COPY package*.json ./

RUN npm install
CMD npm start

COPY . .