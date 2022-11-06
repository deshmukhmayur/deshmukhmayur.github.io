FROM node:lts

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../

COPY . .

# USER node
EXPOSE 8080

CMD ["npm", "start"]
