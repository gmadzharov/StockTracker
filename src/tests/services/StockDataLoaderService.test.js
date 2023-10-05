import fs from 'fs';
import { use, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import ArraySlicer from '../../utils/ArraySlicer.js';
import StockDataLoaderService from '../../services/StockDataLoaderService.js';


use(chaiAsPromised);

describe('StockDataLoaderService', () => {
    let stockDataLoaderService;
    let readFileMock;

    let emptyData = []
    let validData = [
        {
            "sec": 10,
            "price": 1000
        },
        {
            "sec": 11,
            "price": 10000
        },
        {
            "sec": 12,
            "price": 100
        },
        {
            "sec": 13,
            "price": 100
        },
        {
            "sec": 14,
            "price": 90
        }
    ]

    let callPath = "/testPath/data.json";

    beforeEach(() => {
        stockDataLoaderService = new StockDataLoaderService({ dataLocation: callPath });
        readFileMock = sinon.stub(fs.promises, "readFile");
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('GetStockData', () => {
        it('should return correct array slice if data is set', async () => {
            readFileMock.resolves(JSON.stringify(validData))

            const result = await stockDataLoaderService.GetStockData(11, 14);

            expect(result).deep.equals(new ArraySlicer(validData, 1, 5));
            expect(readFileMock.calledOnceWith(callPath)).to.be.true;
        });

        it('should throw error if data is not correct json format', async () => {
            readFileMock.resolves("test non valid json string")

            await expect(stockDataLoaderService.GetStockData(11, 14)).to.be.rejected;
            expect(readFileMock.calledOnceWith(callPath)).to.be.true;
        });

        it('should return null when requested slice is out of data bounds', async () => {
            readFileMock.resolves(JSON.stringify(validData))

            const result = await stockDataLoaderService.GetStockData(100, 200);

            expect(result).to.be.null;
            expect(readFileMock.calledOnceWith(callPath)).to.be.true;
        })

        it('should return null when data is empty', async () => {
            readFileMock.resolves(JSON.stringify(emptyData))

            const result = await stockDataLoaderService.GetStockData(11, 14);

            expect(result).to.be.null;
            expect(readFileMock.calledOnceWith(callPath)).to.be.true;
        })

        it('should throw error when file cant be read', async () => {
            readFileMock.rejects(new Error("test error"))

            await expect(stockDataLoaderService.GetStockData(11, 14)).to.be.rejected;
            expect(readFileMock.calledOnceWith(callPath)).to.be.true;
        })
    });
});
