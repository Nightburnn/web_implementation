FROM node:21

WORKDIR /app

COPY . /app

EXPOSE 5000

RUN npm install

ENV NAME backend

CMD [ "node", "server.js" ]
