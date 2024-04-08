FROM node:18.17.1 AS deps

WORKDIR /app

COPY package.json ./

RUN npm install

FROM node:18.17.1

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g nodemon

COPY --from=deps /app/node_modules ./node_modules

ARG WATCH=false
ENV WATCH=$WATCH

CMD bash ./docker-start.sh