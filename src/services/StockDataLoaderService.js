import fs from 'fs/promises';
import ArraySlicer from '../utils/ArraySlicer.js';

class StockDataLoaderService {
    constructor(configs) {
        this._dataFilePath = configs.dataLocation;
        this._loadedDataPointsCache = null;
    }

    async GetStockData(from, to) {
        await this._loadStockDataPoints();

        return this._sliceData(from, to);
    }

    async _loadStockDataPoints() {
        if (this._loadedDataPointsCache === null) {
            try {
                const jsonData = await fs.readFile(this._dataFilePath, 'utf8');
                this._loadedDataPointsCache = JSON.parse(jsonData);
            } catch (error) {
                throw new Error('Error loading stock data: ' + error.message);
            }
        }
    }

    _sliceData(from, to) {
        if (!this._checkIfInDataBoundaries(from, to)) {
            return null;
        }

        const fromIndex = from - this.dataStartPoint;
        const toIndex = to - this.dataStartPoint + 1;

        return new ArraySlicer(this._loadedDataPointsCache, fromIndex, toIndex);
    }

    _checkIfInDataBoundaries(from, to) {
        if (from > to || !Array.isArray(this._loadedDataPointsCache) || this._loadedDataPointsCache.length === 0) {
            return false;
        }

        return from >= this.dataStartPoint && to <= this.dataEndPoint;
    }

    get dataStartPoint() {
        return this._loadedDataPointsCache ? this._loadedDataPointsCache[0]?.sec : undefined;
    }

    get dataEndPoint() {
        return this._loadedDataPointsCache ? this._loadedDataPointsCache[this._loadedDataPointsCache.length - 1]?.sec : undefined;
    }
}

export default StockDataLoaderService;
