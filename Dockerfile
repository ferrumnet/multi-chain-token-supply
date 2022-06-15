FROM node:14.19.3-alpine3.16

WORKDIR /app

COPY . /app

RUN npm install typescript -g

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "/usr/local/bin/npm", "run", "dev"]
