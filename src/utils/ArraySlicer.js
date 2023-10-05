class ArraySlicer {
    constructor(arr, lo, hi) {
        this.arr = arr;
        this.lo = lo;
        this.hi = hi;
        this.length = hi - lo;
    }
    _contains(ix) {
        return this.lo + ix < this.hi;
    }
    get(ix) {
        if (this._contains(ix)) {
            return this.arr[this.lo + ix];
        } else {
            return;
        }
    }
    set(ix, value) {
        if (this._contains(ix)) {
            return (this.arr[this.lo + ix] = value);
        } else {
            return;
        }
    }
};

//So an array slice doesnt create copy of the data in the array.

export default ArraySlicer;


