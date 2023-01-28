import express from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/error-middleware';
import userRouter from './routes/user-routes';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);

app.use(errorHandler);

export default app;
