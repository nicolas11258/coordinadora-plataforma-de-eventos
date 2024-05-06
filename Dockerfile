FROM node:latest

EXPOSE 3000

WORKDIR /app

COPY ./api .

RUN npm install

CMD ["npm", "start"]
