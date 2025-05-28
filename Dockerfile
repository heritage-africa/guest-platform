FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Conteneur de runtime avec `serve`
FROM node:18-alpine
RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/build .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
