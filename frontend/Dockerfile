# Build stage
FROM node:20.18.0 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a shell script to handle environment variable substitution
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'echo "window.ENV = { BACKEND_URL: \"$BACKEND_URL\" };" > /usr/share/nginx/html/env-config.js' >> /docker-entrypoint.sh && \
    echo 'exec "$@"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

# Make port 80 available to the world outside this container
EXPOSE 80

# Set the entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
