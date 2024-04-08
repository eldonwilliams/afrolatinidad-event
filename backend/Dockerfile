FROM node:18.17.1 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:18.17.1

ENV PORT=3030

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g nodemon

COPY --from=deps /app /app

ARG WATCH=false
ENV WATCH=$WATCH

CMD if [ "$WATCH" = "true" ]; then npm run watch; else npm run start; fi