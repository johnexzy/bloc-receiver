export const formatMoney = (n: number, symbol: string) =>
  symbol + ' ' + (Math.round(n * 100) / 100).toLocaleString();