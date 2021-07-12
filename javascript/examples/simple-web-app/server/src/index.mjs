import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import { exampleRouter } from './routes/example.mjs';
import { errorHandler } from './middlewares/error-handler.mjs';
import { NotFoundError } from './errors/not-found-error.mjs';

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(exampleRouter);

// Route not found in Routes
app.all('*', async (req) => {
  throw new NotFoundError();
});

// Middlewares
app.use(errorHandler);

const start = async () => {
  const port = 3000;
  app.listen(port, () => {
    console.log('Listening on port', port);
  });
};

start();
