# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g nodemon

# Copy the rest of the application files to the container
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Command to start the application with nodemon for live reload
CMD ["npm", "run", "dev"]
