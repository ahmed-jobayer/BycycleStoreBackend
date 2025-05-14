//node dist/server.js
// npm run start:dev

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application , Response, Request} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['https://bicyclestore-sdffweff.vercel.app','http://localhost:5173'], credentials: true })); 

app.use('/api', router);

app.use(globalErrorHandler);



app.get('/', (req: Request, res:Response)=> {
    try {
        res.status(200).send({
            success: true,
            message: 'Server is running! ⚡',

        })
    } catch (err:any) {
        res.status(500).send({
            message: err.message || 'Something Went Wrong',
            success: false,
            error: err.error,
            stack: err.stack
        })
    }
})

app.use(notFound as any);

export default app;
