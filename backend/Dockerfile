FROM node:18-alpine AS builder

RUN apk add --no-cache npm

WORKDIR /backend


COPY package*.json ./
RUN npm install

CMD npm run dev

COPY . .
