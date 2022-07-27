FROM node:alpine

WORKDIR /docker/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

#CMD /wait-for-it.sh mysql_server:3306 -- npm run dev