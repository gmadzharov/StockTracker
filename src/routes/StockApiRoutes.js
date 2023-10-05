import express from 'express';

import StockApiController from '../controllers/StockApiController.js';
import StockDataLoaderService from '../services/StockDataLoaderService.js';
import StockAnalysisService from '../services/StockAnalysisService.js';
import * as dataConfigs from "../../configs/dataConfigs.js"

const stockDataLoaderService = new StockDataLoaderService(dataConfigs);
const stockAnalysisService = new StockAnalysisService();
const stockApiController = new StockApiController(stockDataLoaderService, stockAnalysisService)

const router = express.Router();

router.get('/calculateMaxProfit', stockApiController.calculateMaxProfit)

export default router;