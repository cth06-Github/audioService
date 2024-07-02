# Use an official Node.js runtime as a parent image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install && \
    npm install @mui/material @emotion/react @mui/icons-material @emotion/styled jose

# Copy the rest of the application code to the working directory
COPY ./frontend /app

# Re-build (multi-stage build)
FROM node:18-alpine
COPY --from=build /app /

# Expose port 3000
EXPOSE 3000

# Command to start the development server: # CMD npm run dev
CMD ["npm", "run", "dev"]