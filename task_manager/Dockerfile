FROM node:latest AS node
WORKDIR /app
COPY . .
RUN  npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node  /app/dist/task_manager /usr/share/nginx/html
