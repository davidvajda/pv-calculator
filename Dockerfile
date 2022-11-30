FROM node:16-alpine 
WORKDIR /
COPY . .
RUN npm ci --only=production
RUN npm run build
ENV NODE_ENV production
EXPOSE 8080
CMD [ "node", "server.js" ]