FROM node
MAINTAINER tomspter
COPY korea_wx /usr/
WORKDIR /usr/korea_wx
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
CMD ["npm","run","start"]
