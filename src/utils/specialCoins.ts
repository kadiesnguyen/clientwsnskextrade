export const SPECIAL_COIN_SYMBOLS = new Set([
  "XAUUSD",
  "XAGUSD",
  "GBPUSD",
  "USDJPY",
  "EURUSD",
  "AAPL",
]);

export const isSpecialCoin = (coin: { symbol?: string }) =>
  SPECIAL_COIN_SYMBOLS.has((coin.symbol ?? "").toUpperCase());

export const isCryptoCoin = (coin: { symbol?: string }) =>
  (coin.symbol ?? "").toUpperCase().endsWith("USDT");
