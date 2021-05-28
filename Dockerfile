FROM node:15.12.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 9000
EXPOSE 5000

CMD ["npm", "run", "start"]