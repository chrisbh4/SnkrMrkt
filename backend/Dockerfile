# Use the official Node.js LTS version as the base image
FROM node:lts

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port that the server will run on
EXPOSE 8080

# Start the server
CMD ["npm", "start"]
