FROM node:9.4.0-alpine

WORKDIR /usr/app

RUN npm install -g pm2@latest
COPY package*.json ./
RUN npm install -qy

COPY . .

EXPOSE 3000

CMD ["pm2", "dist/server.js"]