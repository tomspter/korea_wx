FROM node
MAINTAINER tomspter
COPY . /usr/
WORKDIR /usr
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD ["npm","run","start"]
