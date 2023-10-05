import express from 'express';
import CalculatorPageController from '../controllers/CalculatorPageController.js';

const router = express.Router();

router.get('/', CalculatorPageController.renderCalculator)

export default router;