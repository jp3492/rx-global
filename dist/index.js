"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var stores = {};
var Store = /** @class */ (function () {
    function Store() {
        var _this = this;
        this.value = "";
        this.setters = [];
        this.setValue = function (value) {
            _this.value = value;
            _this.setters.forEach(function (setter) { return setter(_this.value); });
        };
        this.addSetter = function (setter) {
            _this.setters = _this.setters.concat([setter]);
        };
        this.unsubscribe = function (setter) {
            _this.setters = _this.setters.filter(function (s) { return s !== setter; });
        };
    }
    return Store;
}());
exports.setGlobalState = function (id, value) {
    if (!stores[id]) {
        stores[id] = new Store();
        stores[id].setValue(value);
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
exports.useGlobalState = function (id, initialValue) {
    if (initialValue === void 0) { initialValue = ""; }
    var _a = react_1.useState(""), _ = _a[0], set = _a[1];
    if (!stores.hasOwnProperty(id)) {
        stores[id] = new Store();
        stores[id].setValue(initialValue);
    }
    if (!stores[id].setters.includes(set)) {
        stores[id].addSetter(set);
    }
    var _b = stores[id], value = _b.value, setValue = _b.setValue, unsubscribe = _b.unsubscribe;
    react_1.useEffect(function () { return function () { return unsubscribe(set); }; }, []);
    return [value, setValue];
};
