//node dist/server.js
// npm run start:dev

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*', credentials: true })); // *

app.use('/api', router);

app.use(globalErrorHandler);

app.use(notFound as any);

export default app;
