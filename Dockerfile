FROM node:6.9.5

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json .
RUN npm install

COPY ./src ./src

ENTRYPOINT ["npm"]
CMD ["start"]
