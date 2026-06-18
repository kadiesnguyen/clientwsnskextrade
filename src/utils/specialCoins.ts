export const SPECIAL_COIN_SYMBOLS = new Set([
  "XAUUSD",
  "XAGUSD",
  "GBPUSD",
  "USDJPY",
  "EURUSD",
  "AAPL",
]);

export const isSpecialCoinSymbol = (symbol: string) =>
  SPECIAL_COIN_SYMBOLS.has(symbol.toUpperCase());

export const isCryptoCoinSymbol = (symbol: string) =>
  symbol.toUpperCase().endsWith("USDT");
