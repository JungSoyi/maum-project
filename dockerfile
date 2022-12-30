FROM node:18 AS builder

RUN apk update && apk add bash

SHELL [ "/app/bash", "-c" ]

WORKDIR /app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm install webpack --legacy-peer-deps

RUN npm run build

FROM node:18-alpine

RUN apk update && apk add bash

SHELL [ "/app/bash", "-c" ]

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app ./

COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

EXPOSE 4000

CMD ["node", "dist/main"]

