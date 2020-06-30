"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stores = {};
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        this.value = "";
        this.setters = [];
        this.setInitialValue = function (value) {
            _this.initialValue = value;
            _this.setValue(value);
        };
        this.setValue = function (value) {
            _this.value = value;
            _this.setters.forEach(function (setter) { return setter(_this.value); });
        };
        this.addSetter = function (setter) {
            _this.setters = __spreadArrays(_this.setters, [setter]);
        };
        this.unsubscribe = function (setter) {
            _this.setters = _this.setters.filter(function (s) { return s !== setter; });
            return _this.setters.length;
        };
    }
    return Store;
}());
var initializeState = function (id, value) {
    stores[id] = new Store();
    stores[id].setInitialValue(value);
};
exports.setGlobalState = function (id, value) {
    if (!stores[id]) {
        initializeState(id, value);
    }
    else {
        stores[id].setValue(value);
    }
};
exports.getGlobalState = function (id) {
    try {
        return stores[id].value;
    }
    catch (error) {
        console.error("No gloabl value for id: " + id);
    }
};
exports.updateGlobalState = function (id, cb) {
    var store = stores[id];
    if (!store) {
        console.error("No store initialized for " + id);
    }
    else {
        var updatedValue = cb(store.value);
        store.setValue(updatedValue);
    }
};
exports.subGlobalState = function (id, cb) {
    stores[id].subscribe(cb);
};
exports.unsubGlobalState = function (id, cb) {
    stores[id].unsubscribe(cb);
};
exports.resetGlobalState = function (id) {
    var store = stores[id];
    store.setValue(store.initialValue);
};
exports.resetGlobalStates = function (ids) {
    ids.forEach(function (id) {
        var store = stores[id];
        store.setValue(store.initialValue);
    });
};
exports.useGlobalState = function (id, initialValue) {
    if (initialValue === void 0) { initialValue = ""; }
    var _a = react_1.useState(""), _ = _a[0], set = _a[1];
    if (!stores.hasOwnProperty(id)) {
        initializeState(id, initialValue);
    }
    if (!stores[id].setters.includes(set)) {
        stores[id].addSetter(set);
    }
    var _b = stores[id], value = _b.value, setValue = _b.setValue, unsubscribe = _b.unsubscribe;
    react_1.useEffect(function () { return function () {
        var setters = unsubscribe(set);
        if (setters.length === 0) {
            delete stores[id];
        }
    }; }, []);
    return [value, setValue];
};
