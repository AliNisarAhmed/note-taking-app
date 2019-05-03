FROM node:11.14 as builder
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

FROM node:11.14
COPY /.env ./ 
COPY --from=builder /app/dist/ ./dist
COPY --from=builder /app/server/ ./server
COPY /packageJson_server/package.json ./
RUN npm install
ENV SECRET_FOR_TOKEN="sjh374y57893yifhkhdiuy897348o2lnfihj(&(&&^IU))"
ENV MONGO_HOSTNAME="mongodb://aa87:abc123@ds151066.mlab.com:51066/note-app"
EXPOSE 8080
CMD [ "npm", "run", "serve" ]


# Commands below build a docker image, but it includes everything and its size is huge
# Will try multi stage builds now to discard the front-end dependencies

# FROM node:11.14 as builder
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build
# ENV SECRET_FOR_TOKEN="sjh374y57893yifhkhdiuy897348o2lnfihj(&(&&^IU))"
# EXPOSE 8080
# CMD [ "npm", "run", "serve" ]


# RUN npm install express joi jsonwebtoken mongoose bcrypt body-parser boom concurrently cors dotenv 

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