// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { loggerMiddleware } from './middlewares/loggerMiddleware';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware';
import todoRoutes from './routes/todoRoutes';
import userRoutes from './routes/userRoutes';
import databaseConfig from './config/database';

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

createConnection(databaseConfig)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to the database', error));
