import util from './util';

class PivotData {

    constructor(input, opts) {;
        this.input = input;
        this.aggregator = opts.aggregator || aggregatorTemplates.count()();
        this.aggregatorName = opts.aggregatorName || "Count";
        this.colAttrs = opts.cols || [];
        this.rowAttrs = opts.rows || [];
        this.valAttrs = opts.vals || [];
        this.sorters = opts.sorters || {};
        this.rowOrder = opts.rowOrder || "key_a_to_z";
        this.colOrder = opts.colOrder || "key_a_to_z";
        this.derivedAttributes = opts.derivedAttributes || {};
        this.filter = opts.filter || (-> true);
        this.tree = {};
        this.rowKeys = [];
        this.colKeys = [];
        this.rowTotals = {};
        this.colTotals = {};
        this.allTotal = this.aggregator(this, [], []);
        this.sorted = false;
    }

    static forEachRecord = (input, derivedAttributes, fn) => {

    }

    forEachMatchingRecord(criteria, callback) => {
        PivotData.forEachRecord(this.input, this.derivedAttributes, (record) => {
            if (!this.filter(record)) return;
            for (let key in criteria) {
                if (criteria.hasOwnProperty(key)) {
                    let val = criteria[key];
                    let rec = record[key] || 'null';
                    if (val != rec) return;
                }
            }
            return callback(record);
        })
    }

    arrSort(attrs) {
        const len = attrs.length;
        const results = [];

        for (let i = 0; i < len; i++) {
            a = attrs[i];
            results.push(getSort(this.sorters, a));
        }

        return results;
    }

    sortKeys() {
        if (!this.sorted) {
            this.sorted = true;
            const v = (r, c) => this.getAggregator(r, c).value;

            switch(this.rowOrder) {
                case 'value_a_to_z':
                    this.rowKeys.sort((a, b) => naturalSort(v(a, []), v(b, [])));
                case 'value_z_to_a':
                    this.rowKeys.sort((a, b) => -naturalSort(v(a, []), v(b, [])));
                default:
                    this.rowKeys.sort(this.arrSort(this.rowAttrs));
            }
        }
    }

    getColKeys() {
        this.sortKeys();
        return this.colKeys;
    }

    getRowKeys() {
        this.sortKeys();
        return this.rowKeys;
    }

    processRecord(record) {
        const colKey = [];
        const rowKey = [];
        const colAttrsLen = this.colAttrs.length;
        const rowAttrsLen = this.rowAttrs.length;

        const genColRowKey = (k) => {
            const len = k.length;
            for (let i = 0; i < len; i++) {
                let val = record[i];
                val = (val != null) ? val : 'null';
                k.push(val);
            }
        }

        genColRowKey(colKey);
        genColRowKey(rowKey);

        const flatRowKey = rowKey.join(String.fromCharCode(0));
        const flatColKey = colKey.join(String.fromCharCode(0));
        const rowKeyLen = rowKey.length;
        const colKeyLen = rowKey.length;


        this.allTotal.push(record);

        if (rowKeyLen !== 0) {
            if (!this.rowTotals[flatRowKey]) {
                this.rowKeys.push(rowKey);
                this.rowTotals[flatRowKey] = this.aggregator(this, rowKey, []);
            }
        }

        if (colKeyLen !== 0) {
            if (!this.colTotals[flatColKey]) {
                this.colKeys.push(colKey);
                this.colTotals[flatColKey] = this.aggregator(this, [], colKey);
            }
        }

        if (colKeyLen !== 0 && rowKeyLen !== 0) {
            if (!this.tree[flatRowKey]) {
                this.tree[flatRowKey] = {};
            }

            if (!this.tree[flatRowKey][flatColKey]) {
                this.tree[flatRowKey][flatColKey] = this.aggregator(this, rowKey, colKey);
            }

            this.tree[flatRowKey][flatColKey].push(record);
        }
    }

    getAggregator(rowKey, colKey) {
        const flatRowKey = rowKey.join(String.fromCharCode(0));
        const flatColKey = colKey.join(String.fromCharCode(0));
        const rowKeyLen = rowKey.length;
        const colKeyLen = colKey.length;
        let agg;

        if (rowKeyLen === 0 && colKeyLen === 0) {
            agg = this.allTotal;
        } else if (rowKeyLen === 0) {
            agg = this.colTotals[flatColKey];
        } else if (colKeyLen === 0) {
            agg = this.rowTotals[flatRowKey];
        } else {
            agg = this.tree[flatRowKey][flatColKey];
        }

        if (typeof agg !== "undefined" && agg !== null) {
            return agg;
        } else {
            return {
                value: () => null,
                format: () => ""
            }
        }
    }
}

function getSort(sorters, attr) {
    var sort;
    if (sorters != null) {
        if (util.isFunction(sorters)) {
            sort = sorters(attr);
            if (util.isFunction(sort)) {
                return sort;
            }
        } else if (sorters[attr] != null) {
            return sorters[attr];
        }
    }
    return naturalSort;
}

function naturalSort(as, bs) {

}
