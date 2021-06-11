# Build from image
FROM node:15-alpine

# Working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Installing dependencies
RUN npm install --silent

# Copy local files to app
COPY . .

ENV PORT 8080
EXPOSE 8080

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

CMD [ "npm", "start" ]
