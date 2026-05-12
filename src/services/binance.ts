// services/binance.ts

export interface BinanceTickerData {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  change: number;
}

export async function getTickerBySymbol(
  symbol: string,
  interval: string,
): Promise<BinanceTickerData | null> {
  try {
    const pair = symbol.replace(/[-/]/g, "").toUpperCase();

    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=1`,
    );

    const data = await res.json();

    const candle = data?.[0];

    if (!candle) return null;

    const open = Number(candle[1]);
    const high = Number(candle[2]);
    const low = Number(candle[3]);
    const close = Number(candle[4]);
    const volume = Number(candle[5]);

    return {
      open,
      high,
      low,
      close,
      volume,
      change: ((close - open) / open) * 100,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
}
