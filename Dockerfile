FROM node:14.15.1-buster as development

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm i -g @nestjs/cli

COPY . .

# Copy config
#COPY .env.development.example .env

RUN nest build

# seperate build for production
FROM node:14.15.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]