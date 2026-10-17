# ==========================================
# STAGE 1: Build
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Serve with nginx
# ==========================================
FROM nginx:alpine AS production
# Drop nginx's default welcome page: the site has no root index.html ("/" redirects to /fr/),
# so it would otherwise be served at /index.html. Keep 50x.html, used by nginx.conf.
RUN rm /usr/share/nginx/html/index.html
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]