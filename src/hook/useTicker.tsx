import { useEffect, useState } from "react";

interface TickerData {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  change: number;
}

export function useTicker(symbol: string, interval: string) {
  const [ticker, setTicker] = useState<TickerData | null>(null);
  useEffect(() => {
    if (!symbol) return;
    const pair = symbol.replace("-", "").replace("/", "").toLowerCase();

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${pair}@kline_${interval}`,
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      const kline = message.k;

      const open = Number(kline.o);
      const close = Number(kline.c);

      setTicker({
        open,
        close,
        high: Number(kline.h),
        low: Number(kline.l),
        volume: Number(kline.v),

        change: ((close - open) / open) * 100,
      });
    };

    ws.onerror = (err) => {
      console.log(err);
    };

    return () => {
      ws.close();
    };
  }, [symbol, interval]);

  return ticker;
}
