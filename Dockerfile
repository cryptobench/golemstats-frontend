FROM node:lts-alpine as build
WORKDIR /app
RUN mkdir /crawler
COPY ./package.json /app/package.json
COPY ./golemstatssitemap.xml /crawler/sitemap.xml
COPY ./robots.txt /crawler/robots.txt
RUN npm install
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.19.9-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
