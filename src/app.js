import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import './db.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import { corsOptions } from './config.js';

const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', tasksRoutes);

export default app;
