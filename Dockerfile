# Builder
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --silent && mv node_modules ../

# Final image
FROM bitnami/nginx:latest

COPY --from=build /usr/src/app/build /app

EXPOSE 8080
