# Use an official Node runtime as the base image
FROM node:20.18.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the app when the container launches
CMD ["npm", "start"]
