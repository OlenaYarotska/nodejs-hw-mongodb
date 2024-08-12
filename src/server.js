import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewars/notFoundHandler.js';
import { errorHandler } from './middlewars/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';


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
   app.use(cookieParser());

    app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
    );

   app.use(router);
   app.use('*', notFoundHandler);
   app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
}

