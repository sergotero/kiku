# ETAPA 1: Frontend
FROM node:25.2.1-slim AS builder
WORKDIR /opt/web
COPY ./web/package*.json ./
RUN npm install
COPY ./web/ .
RUN npm run build

# ETAPA 2: Backend (Limpio)
FROM node:25.2.1-alpine3.22
WORKDIR /opt/kiku-api

# Instalamos solo dependencias de producción
COPY ./api/package*.json ./
RUN npm install --omit=dev

# Copiamos el código de la API (Docker ignorará /datasets gracias al .dockerignore)
COPY ./api/ .

# Copiamos el build del frontend
COPY --from=builder /opt/web/dist ./src/web/build

EXPOSE 3000

# Arrancamos la app directamente, sin semillas
CMD ["node", "app.js"]