FROM node:20

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod 777 ./wait-for-db.sh

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
