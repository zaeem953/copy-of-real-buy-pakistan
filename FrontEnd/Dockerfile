
FROM node:20.2.0


WORKDIR /FrontEnd


COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
