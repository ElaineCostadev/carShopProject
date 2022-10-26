import express from 'express';
import 'express-async-errors';
import carRoute from './Routes/carRoute';
import errorHandler from './middleware/errorHandler';
import motorcycleRoute from './Routes/motorcycleRoute';

const app = express();

app.use(express.json());
app.use(carRoute);
app.use(motorcycleRoute);

app.use(errorHandler);

export default app;
