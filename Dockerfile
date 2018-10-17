FROM node:latest

WORKDIR /usr/src/app/
COPY ./ ./
RUN yarn --only=prod --registry=https://registry.npm.taobao.org
RUN yarn install
CMD ["yarn", "start"]