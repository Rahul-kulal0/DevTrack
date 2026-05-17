# Build stage
<<<<<<< HEAD
FROM node:20-alpine as build
=======
FROM node:18-alpine as build
>>>>>>> 0956932831296c22288541f9a6aff055888c5eb0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
