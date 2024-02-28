FROM node:alpine

WORKDIR /usr/src/app

ENV DATABASE_URL postgresql://postgres:1234@db:5432/postgres?schema=public
ENV DB_USER postgres
ENV DB_HOST db
ENV DB_NAME postgres
ENV DB_PASSWORD 1234
ENV DB_PORT 5432
ENV DB_USER postgres
ENV BACKEND_PORT 3000
ENV TOKEN_SECRET 1234

COPY . .

RUN npm install

EXPOSE 3000