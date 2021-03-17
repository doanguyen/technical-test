FROM node:13.7

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package-lock.json package.json /app/

RUN npm install

CMD ng serve --host 0.0.0.0
