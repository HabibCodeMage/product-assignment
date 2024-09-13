# Product Assignment

This project includes a Dockerized setup for a full-stack application with a backend built using Express, a frontend using Next.js, and PostgreSQL as the database.

## Prerequisites

- **Docker**: Make sure Docker and Docker Compose are installed on your machine.
- **Docker Compose**: Ensure you have Docker Compose installed to manage multi-container Docker applications.

## Getting Started

Follow these steps to set up and run the application:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/HabibCodeMage/product-assignment.git
cd product-assignment
```

### 2. Update Environment Variables
Ensure that the necessary environment variables are set in your .env file for both the frontend and backend services. Create a .env file in the backend and frontend directory with the following content (replace placeholders with actual values):
## Note for testing purpose providing values


## For backend
```bash
DATABASE_URL="postgresql://myuser:mypassword@postgres:5432/mydatabase?schema=public"
JWT_SECRET='$2a$12$sm12jfnbUMp.3R0YeVo00eMqsxxmy6Hi0xtzzZ0dl1r6zYRwF6UQ.'
```
## For frontend
```bash
NEXT_PUBLIC_BACKEND_BASE_URL="http://localhost:5000"
```

### 3. Build and Run Docker Containers
Run the following command to build and start all services defined in docker-compose.yml:

```bash
sudo docker-compose up --build
```
- This command will build the Docker images for the backend and frontend services and start all containers.
- The PostgreSQL database will be initialized and the services will start once the database is ready.


### 4. Access the Application
Once the containers are up and running:

- <strong>Frontend</strong>: Open your web browser and navigate to http://localhost:3000 to access the Next.js frontend.
- <strong>Backend</strong>: The Express backend will be available at http://localhost:5000.

### 5. Stopping the Application
To stop the Docker containers, use:
```bash
sudo docker-compose down
```
### 6. Additional Information

**Backend**: The backend is built using Express and connects to PostgreSQL.
**Frontend**: The frontend is a Next.js application that communicates with the backend.
**Database**: PostgreSQL is used as the database for the application.
