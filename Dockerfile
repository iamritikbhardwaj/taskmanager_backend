# Use Node.js 22 official image
FROM node:22

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose the port your app runs on (e.g., 8080 or 3000)
EXPOSE 8080

# Start the app
CMD ["npm", "run","start"]
