import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import usersRouter from './modules/users/users.module';
import productsRouter from './modules/products/products.module';
import authRouter from './modules/auth/auth.module';
import { AppController } from './app.controller';
import './config/database.config';
const app: Express = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie with CORS
  })
);

// Routes
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

// Default route
app.get('', AppController.getDefaultRoute);

// Catch-all route
app.all('*', (_req: Request, res: Response) => {
  return res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err: unknown, req: Request, res: Response) => {
  console.error(err);
  res.status(500).send({ message: 'Something went wrong!' });
});

export default app;
