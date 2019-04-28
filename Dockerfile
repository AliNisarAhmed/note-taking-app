FROM node:11.14 as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
ENV SECRET_FOR_TOKEN="sjh374y57893yifhkhdiuy897348o2lnfihj(&(&&^IU))"
EXPOSE 8080
CMD [ "npm", "run", "serve" ]

# FROM node:11.14
# COPY --from=builder /app/dist ./dist 
# COPY --from=builder /app/package.json .
# COPY --from=builder /app/server ./server
# RUN npm install

# EXPOSE 8080
# COPY package.json ./
# RUN mkdir -p /usr/src/app
# WORKDIR /


# FROM node:11.14-alpine
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# USER node
# RUN npm install
# COPY --chown=node:node . .
# EXPOSE 8080
# CMD ["npm", "start"]