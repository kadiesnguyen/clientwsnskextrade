"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { iconMap } from "./CoinPage";

export default function CoinSidebar({
  coins,
  selectedCoin,
  onSelect,
  time,
}: any) {
  const [marketData, setMarketData] = useState<any>({});

  const fetchTicker = async () => {
    try {
      const responses = await Promise.all(
        coins.map(async (coin: any) => {
          const symbol = coin.symbol.replace("-", "").toUpperCase();

          const res = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${time}&limit=1`,
          );

          const data = await res.json();

          const candle = data?.[0];

          if (!candle) return null;

          const open = Number(candle[1]);
          const high = Number(candle[2]);
          const low = Number(candle[3]);
          const close = Number(candle[4]);
          const volume = Number(candle[5]);

          const change = ((close - open) / open) * 100;

          return {
            symbol,
            open,
            high,
            low,
            close,
            volume,
            change,
          };
        }),
      );

      const formatted: any = {};

      responses.forEach((item: any) => {
        if (!item) return;

        formatted[item.symbol] = item;
      });

      setMarketData(formatted);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTicker();

    const intervalId = setInterval(fetchTicker, 3000);

    return () => clearInterval(intervalId);
  }, [coins, time]);
  return (
    <Box
      sx={{
        background: "#061018",
        overflowY: "auto",
        height: "100%",
      }}
    >
      {coins?.map((coin: any) => {
        const symbol = coin.symbol.replace("-", "").toUpperCase();

        const data = marketData[symbol];

        const active = selectedCoin?.symbol === coin.symbol;

        const baseSymbol = coin.title.replace("/USDT", "");
        return (
          <Box
            key={coin.id}
            onClick={() => onSelect(coin)}
            sx={{
              cursor: "pointer",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #111",
              background: active ? "#0c1b29" : "transparent",
              transition: "0.2s",

              "&:hover": {
                background: "#0c1b29",
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {/* LEFT */}
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  src={iconMap[baseSymbol] || ""}
                  sx={{ width: 28, height: 28 }}
                >
                  {baseSymbol.charAt(0)}
                </Avatar>

                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {coin.title}
                </Typography>
              </Stack>

              {/* RIGHT */}
              <Box textAlign="right">
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 12,
                  }}
                >
                  {data?.close ? data.close.toLocaleString() : "--"}
                </Typography>

                <Typography
                  sx={{
                    color: data?.change > 0 ? "#00c853" : "#ff5252",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {data?.change ? `${data.change.toFixed(2)}%` : "--"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
}
