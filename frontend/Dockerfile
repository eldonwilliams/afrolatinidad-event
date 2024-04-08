FROM node:18.17.1 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm install

FROM node:18.17.1

WORKDIR /app

COPY --from=deps /app /app
COPY . .

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g nodemon

ARG WATCH=false
ENV WATCH=$WATCH

CMD if [ "$WATCH" = "true" ]; then npm run watch; else npm run build; fi