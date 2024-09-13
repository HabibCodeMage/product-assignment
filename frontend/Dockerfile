# Use a Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker caching
COPY package.json yarn.lock ./

# Install Yarn globally
RUN corepack enable && corepack prepare yarn@1.22.19 --activate

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port for the frontend application
EXPOSE 3000

# Start the Next.js development server
CMD ["yarn", "dev"]
