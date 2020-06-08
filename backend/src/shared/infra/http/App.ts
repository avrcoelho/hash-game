import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import io, { Server } from 'socket.io';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  public server: Application;
  private io: Server;
  private connectedUsers: { [index: string]: any } = {};

  public constructor() {
    this.server = express();

    this.socket();
    this.middlewares();
    this.routes();
    this.errors();
  }

  private socket(): void {
    this.io = io(this.server);

    // escuta os eventos que estão rolando dentro do io
    this.io.on('connection', socket => {
      const { code } = socket.handshake.query;

      this.connectedUsers[code] = socket.id;

      socket.on('disconnect', () => {
        delete this.connectedUsers[code];
      });
    });
  }

  private middlewares() {
    this.server.use(
      cors({
        origin: 'http://localhost:3000',
      }),
    );
    this.server.use(express.json());
    this.server.use(errors());

    this.server.use(
      (request: Request, response: Response, next: NextFunction) => {
        request.io = this.io;
        request.connectedUsers = this.connectedUsers;

        next();
      },
    );
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
