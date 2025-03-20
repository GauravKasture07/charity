# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy backend code
COPY . .

# Expose the port
EXPOSE 3004

# Start the backend server
CMD ["npm", "start"]