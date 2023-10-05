import { expect } from 'chai';
import sinon from 'sinon';

import StockApiController from '../../controllers/StockApiController.js';

import StockDataLoaderService from '../../services/StockDataLoaderService.js';
import StockAnalysisService from '../../services/StockAnalysisService.js';
import ArraySlicer from '../../utils/ArraySlicer.js';


describe('StockApiController', () => {
    let stockApiController;

    let stockDataLoaderServiceMock;
    let stockAnalysisServiceMockObj;

    let req;
    let res;
    let next;

    beforeEach(() => {
        stockDataLoaderServiceMock = sinon.createStubInstance(StockDataLoaderService)
        stockAnalysisServiceMockObj = sinon.createStubInstance(StockAnalysisService)
        stockApiController = new StockApiController(stockDataLoaderServiceMock, stockAnalysisServiceMockObj)

        req = {};
        res = {
            status: sinon.mock().returnsThis(),
            json: sinon.mock().returnsThis(),
        };
        next = sinon.spy()
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('calculateMaxProfit', () => {
        it('should return 400 and error if "from" or "to" parameters are missing', async () => {
            req.query = {};

            await stockApiController.calculateMaxProfit(req, res, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Invalid parameters. Both from and to are required.' })).to.be.true;
        });

        it('should return 400 and error if "from" or "to" parameter is not a valid integer', async () => {
            req.query = {
                from: 'invalid',
                to: 'invalid'
            }

            await stockApiController.calculateMaxProfit(req, res, next);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Invalid parameters. Both from and to must be valid unix timestamps.' })).to.be.true;
        });

        it('should return 404 if data is requested for undefined data period', async () => {
            req.query = {
                from: '10',
                to: '15'
            }

            stockDataLoaderServiceMock.GetStockData.returns(null);

            await stockApiController.calculateMaxProfit(req, res, next);

            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'No data for time period requested.' })).to.be.true;
        });

        it('should return the result when everything is valid', async () => {
            let validDataSlice = new ArraySlicer([], 0, 1);
            let validCalculatedBuySellTime = {
                maxGainBuyPoint: {
                    "sec": 10,
                    "price": 10
                },
                maxGainSellPoint: {
                    "sec": 11,
                    "price": 100
                },
            }

            req.query = {
                from: '10',
                to: '15'
            }


            stockDataLoaderServiceMock.GetStockData.returns(validDataSlice);
            stockAnalysisServiceMockObj.FindOptimalBuySellTime.returns(validCalculatedBuySellTime);

            await stockApiController.calculateMaxProfit(req, res, next);

            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledOnceWith(validCalculatedBuySellTime)).to.be.true;
        });

        it('should call next with an error if an error occurs', async () => {
            req.query = {
                from: '10',
                to: '15'
            }

            stockDataLoaderServiceMock.GetStockData.throws(new Error('Test error'));

            await stockApiController.calculateMaxProfit(req, res, next);

            expect(next.calledOnceWith(sinon.match.instanceOf(Error))).to.be.true;
        });
    });
});