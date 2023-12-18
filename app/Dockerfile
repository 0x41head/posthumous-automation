# Use the official Node.js image as the base image
FROM node:20.2.0

# Set the working directory inside the container
WORKDIR /app

# Install expo-cli globally
RUN npm install -g expo-cli

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json package-lock.json* ./

# Install app dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port that the Expo server uses
EXPOSE 19006

# Start the Expo web server
CMD ["expo","start","--web", "--https", "-c"]