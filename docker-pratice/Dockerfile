FROM node

WORKDIR /web-server

COPY . .

RUN npm install 

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", "dist/main.js" ]