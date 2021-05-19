FROM node:lts
WORKDIR /usr/src/app
COPY --chown=node:node ./package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build:prod

FROM nginx
EXPOSE 80
COPY --chown=nginx:nginx --from=0 /app/dist /usr/share/nginx/html