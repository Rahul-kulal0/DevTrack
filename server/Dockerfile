<<<<<<< HEAD
FROM node:20-alpine
=======
FROM node:18-alpine
>>>>>>> 0956932831296c22288541f9a6aff055888c5eb0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
