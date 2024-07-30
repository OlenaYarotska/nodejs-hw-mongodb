import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewars/notFoundHandler.js';
import { errorHandler } from './middlewars/errorHandler.js';


dotenv.config();

 export function setupServer() {
  const app = express();
   const PORT = Number(env('PORT') || 3000);

   app.use(cors());
   app.use(
    express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
  );

    app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
    );

   app.use(contactsRouter);
   app.use('*', notFoundHandler);
   app.use(errorHandler);

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
}

