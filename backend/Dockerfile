FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm i bcrypt dotenv jsonwebtoken cookie-parser
EXPOSE 5000
CMD ["nodemon", "index"]
