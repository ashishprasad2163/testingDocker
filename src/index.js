import cors from 'cors';
import bp from 'body-parser';
import express from 'express';
import consola from 'consola';
import mongoose from 'mongoose';
import passport from 'passport';

// Config Import
import { APP_DB, APP_PORT } from './config';

// Routes Import
import jobRoutes from './routes/jobs';
import userRoutes from './routes/users';
import imageRoutes from './routes/images';

const app = express();

require('./middleware/auth');

// Application Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

// Routes Middleware
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', imageRoutes);

const startApp = async () => {
  try {
    await mongoose.connect(APP_DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    consola.success({
      message: `Database connected successfully \n${APP_DB}`,
      badge: true,
    });
    app.listen(APP_PORT, () =>
      consola.success({
        message: `Server started on port ${APP_PORT}`,
        badge: true,
      })
    );
  } catch (err) {
    consola.error({
      message: err.message,
      badge: true,
    });
  }
};

startApp();
