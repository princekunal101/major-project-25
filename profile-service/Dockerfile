# Use node.JS LTS version
FROM node:18-alpine

# Set working Directory
WORKDIR /usr/src/app

# Copy package file first (for cahing)
COPY package*.json ./

# install dependecies
RUN npm install --only=production

# Copy source code
COPY . .

# Build TypeScript (if needed)
RUN npm run build

# Expose service port
EXPOSE 3001

# start service
CMD [ "npm", "run","start:prod" ]