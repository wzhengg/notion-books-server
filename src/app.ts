import express from 'express';
import connectDB from './config/db';
import { errorHandler } from './middleware/error-middleware';
import { sendRemindersJob } from './send-reminders-job';
import userRouter from './routes/user-routes';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);

app.use(errorHandler);

sendRemindersJob.start();

export default app;
