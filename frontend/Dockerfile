# Use the official Node.js LTS version as the base image
FROM node:lts AS build

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Use the official Nginx image to serve the frontend
FROM nginx:stable-alpine

# Copy the build output to the Nginx html folder
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the Nginx server port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
