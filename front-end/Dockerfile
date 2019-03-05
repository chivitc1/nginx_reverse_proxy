FROM node:9.4.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY . .

EXPOSE 4000
ENV API_PORT=3000
ENV API_HOSTNAME=localhost
ENV HTTP_PROTOCOL=https 
CMD ["npm", "start"]