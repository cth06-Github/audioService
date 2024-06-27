# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY ./frontend/transcript-web/package*.json ./
# COPY ./fastfront2/package.json /app/package.json
# COPY ./fastfront2/package-lock.json /app/package-lock.json

# Install dependencies
RUN npm install
RUN npm install @mui/material
RUN npm install @emotion/react
RUN npm install @mui/icons-material
RUN npm install @emotion/styled
RUN npm install jose

# Copy the rest of the application code to the working directory
COPY ./frontend/transcript-web /app

# Expose port 3000
EXPOSE 3000

# Command to start the development server: # CMD npm run dev
CMD ["npm", "run", "dev"]