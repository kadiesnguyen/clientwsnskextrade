import { useEffect, useState } from "react";

export function useTicker(symbol: string) {
  const [ticker, setTicker] = useState<any>(null);

  useEffect(() => {
    if (!symbol) return;

    const pair = symbol.replace("-", "").toLowerCase();

    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${pair}@ticker`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTicker({
        price: Number(data.c),
        change: Number(data.P),
        high: Number(data.h),
        low: Number(data.l),
        volume: Number(data.v),
      });
    };

    ws.onerror = (err) => {
      console.log(err);
    };

    return () => {
      ws.close();
    };
  }, [symbol]);

  return ticker;
}
