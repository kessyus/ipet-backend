FROM node:15
EXPOSE 3000
WORKDIR /app
COPY . /app
RUN cd /app && yarn install
CMD ["node", "index.js"] 