class StockAnalysisService {
    constructor() {
    }

    FindOptimalBuySellTime(data) {
        if (data.length === 0) {
            return null;
        }

        let minPricePoint = data.get(0);
        let maxGainCoef = 1;
        let maxGainBuyPoint = data.get(0);
        let maxGainSellPoint = data.get(0);

        let currentDataPoint;
        let currentGainCoefficient;

        for (let dataPointIndex = 1; dataPointIndex < data.length; dataPointIndex++) {
            currentDataPoint = data.get(dataPointIndex);

            if (currentDataPoint.price < minPricePoint.price) {
                minPricePoint = currentDataPoint;
            } else {
                currentGainCoefficient = currentDataPoint.price / minPricePoint.price;

                if (currentGainCoefficient > maxGainCoef) {
                    maxGainCoef = currentGainCoefficient;
                    maxGainSellPoint = currentDataPoint;
                    maxGainBuyPoint = minPricePoint;
                }
            }
        }

        return {
            maxGainBuyPoint,
            maxGainSellPoint
        }

    }
}

export default StockAnalysisService;