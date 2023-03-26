# Stage 1: Build React app
FROM node:14.17.6-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --f
COPY . .
RUN npm run build

FROM nginx:1.21.4-alpine
COPY config/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
