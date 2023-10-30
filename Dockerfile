FROM node:20.5.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD [ "node", "index.js" ]