"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMoney = void 0;
const formatMoney = (n, symbol) => symbol + ' ' + (Math.round(n * 100) / 100).toLocaleString();
exports.formatMoney = formatMoney;
