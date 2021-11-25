FROM node:lts-alpine as build
WORKDIR /app
RUN mkdir /crawler
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/package.json
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./golemstatssitemap.xml /crawler/sitemap.xml
COPY ./robots.txt /crawler/robots.txt
RUN npm install --silent
RUN npm install -g @vue/cli
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.19.9-alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
