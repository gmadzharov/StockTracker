import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import StockApiRoute from './src/routes/StockApiRoutes.js';
import CalculatorPageRoute from './src/routes/CalculatorPageRoutes.js';
import ErrorHandlerMiddleware from "./src/middleware/ErrorHandlerMiddleware.js"
import RequestsLoggerMiddleware from "./src/middleware/RequestsLoggerMiddleware.js"
import * as configs from './configs/configs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const errorHandler = new ErrorHandlerMiddleware(console);
const requestsLogger = new RequestsLoggerMiddleware(console)

app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'ejs');

app.use(express.static('./frontend/public'));

app.use(requestsLogger.logRequest)
app.use('/api/stock', StockApiRoute)
app.use('/', CalculatorPageRoute)
app.use(errorHandler.handleError);

app.listen(configs.port, () =>
    console.log(`Stock tracker is running on port ${configs.port}`),
);