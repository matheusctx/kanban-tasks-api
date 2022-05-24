import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      error: `Internal server error: ${err.message}`,
    });
  },
);

app.listen(3333, () => {
  console.log('Server is running!')
});