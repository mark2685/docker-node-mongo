FROM node:8.9.4-alpine
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./src/ /app/src/

