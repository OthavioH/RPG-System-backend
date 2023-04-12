FROM node:alpine

WORKDIR /docker/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]