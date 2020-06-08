import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public server: Application;

  public constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.errors();
  }

  private middlewares() {
    this.server.use(
      cors({
        origin: 'http://localhost:3000',
      }),
    );
    this.server.use(express.json());
    this.server.use(errors());
  }

  private routes() {
    this.server.use(routes);
  }

  private errors() {
    this.server.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default App;
