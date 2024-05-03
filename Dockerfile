FROM node:latest

WORKDIR /app

COPY ./api .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
