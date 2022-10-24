import express from 'express';
import 'express-async-errors';
import carRoute from './Routes/carRoute';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(carRoute);

app.use(errorHandler);

export default app;
