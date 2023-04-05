FROM node:16
# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json .
# COPY package-lock.json .
# COPY index.js .
# RUN npm config set strict-ssl=false

# If you are building your code for production
# RUN npm ci 

# Bundle app source
COPY . .
RUN npm install
EXPOSE 3001
CMD [ "node","index.js" ]
#docker build . -t ajeyaunoff/forkapi
