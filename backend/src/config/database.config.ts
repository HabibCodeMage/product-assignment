import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit process with failure code if connection fails
  }
}

// Ensure that Prisma Client is connected on startup
connectDatabase();

export default prisma;
