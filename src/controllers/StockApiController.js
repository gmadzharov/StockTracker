class StockApiController {
    constructor(stockDataLoaderService, stockAnalysisService) {
        this.stockDataLoaderService = stockDataLoaderService;
        this.stockAnalysisService = stockAnalysisService;
    }

    calculateMaxProfit = async (req, res, next) => {
        try {
            const { from, to } = req.query;

            if (!from || !to) {
                return res.status(400).json({ error: 'Invalid parameters. Both from and to are required.' });
            }

            const fromTime = parseInt(from, 10);
            const toTime = parseInt(to, 10);

            if (isNaN(fromTime) || isNaN(toTime)) {
                return res.status(400).json({ error: 'Invalid parameters. Both from and to must be valid unix timestamps.' });
            }
            const stockData = await this.stockDataLoaderService.GetStockData(fromTime, toTime);

            if (stockData == null) {
                return res.status(404).json({ error: 'No data for time period requested.' });
            }

            const result = await this.stockAnalysisService.FindOptimalBuySellTime(stockData);

            if (result === null) {
                return res.status(404).json({ error: 'No profit can be calculated for the given time period.' });
            }

            res.status(200).json(result);
        } catch (error) {
            next(new Error(`Error in calculateMaxProfit: ${error}`))
        }
    }
}

export default StockApiController;