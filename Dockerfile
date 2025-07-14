FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY index.html ./

RUN npm install

COPY src ./src
COPY public ./public

ARG VITE_API_URL
ARG VITE_API_TOKEN
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN

RUN npm run build

FROM nginx:alpine as frontend-final

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]