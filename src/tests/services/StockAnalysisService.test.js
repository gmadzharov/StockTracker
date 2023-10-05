import { expect } from 'chai';
import StockAnalysisService from '../../services/StockAnalysisService.js';
import ArraySlicer from '../../utils/ArraySlicer.js';

describe('StockAnalysisService', () => {
    let service;

    beforeEach(() => {
        service = new StockAnalysisService();
    });

    describe('FindOptimalBuySellTime', () => {
        it('should return null if the data slice is empty', () => {
            const emptyDataSlice = new ArraySlicer([], 0, 0);

            const result = service.FindOptimalBuySellTime(emptyDataSlice);

            expect(result).to.be.null;
        });

        it('should return the correct maxGainBuyPoint and maxGainSellPoint for data slice', () => {
            const profitableTradeDataSlice = new ArraySlicer([
                {
                    "sec": 10,
                    "price": 5000
                },
                {
                    "sec": 11,
                    "price": 1000
                },
                {
                    "sec": 12,
                    "price": 5000
                },
                {
                    "sec": 13,
                    "price": 6000
                },
                {
                    "sec": 14,
                    "price": 10000
                },
                {
                    "sec": 15,
                    "price": 80
                },
                {
                    "sec": 16,
                    "price": 100
                }
            ], 0, 5);

            const result = service.FindOptimalBuySellTime(profitableTradeDataSlice);

            expect(result.maxGainBuyPoint).to.deep.equal({
                "sec": 11,
                "price": 1000
            });
            expect(result.maxGainSellPoint).to.deep.equal({
                "sec": 14,
                "price": 10000
            });
        });

        it('should return the closest maxGainSellPoint if multiple equal same gain ', () => {
            const multipleProfitableDataSlice = new ArraySlicer([
                {
                    "sec": 10,
                    "price": 100
                },
                {
                    "sec": 11,
                    "price": 50
                },
                {
                    "sec": 12,
                    "price": 5000
                },
                {
                    "sec": 13,
                    "price": 6000
                },
                {
                    "sec": 14,
                    "price": 6000
                }
            ], 0, 5);

            const result = service.FindOptimalBuySellTime(multipleProfitableDataSlice);

            expect(result.maxGainBuyPoint).to.deep.equal({
                "sec": 11,
                "price": 50
            });
            expect(result.maxGainSellPoint).to.deep.equal({
                "sec": 13,
                "price": 6000
            });
        });
    });
});
