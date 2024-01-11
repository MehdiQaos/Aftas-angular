# FROM node:alpine

# WORKDIR /app

# COPY . /app

# RUN npm i

# EXPOSE 4200

# CMD [ "npm", "run", "start" ]

FROM node

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

EXPOSE 4200