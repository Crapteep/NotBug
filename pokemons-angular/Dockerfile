
FROM node:18.19-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/pokemons-angular/browser /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       4500;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen  \[::\]:80;/listen  \[::\]:4500;/' /etc/nginx/conf.d/default.conf

EXPOSE 4500

CMD ["nginx", "-g", "daemon off;"]
