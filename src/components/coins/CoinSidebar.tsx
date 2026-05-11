"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const iconMap: any = {
  btc: "/icons/btc.png",
  eth: "/icons/eth.png",
  ltc: "/icons/ltc.png",
  bch: "/icons/bch.png",
  xau: "/icons/gold.png",
};

export default function CoinSidebar({ coins, selectedCoin, onSelect }: any) {
  const [marketData, setMarketData] = useState<any>({});

  useEffect(() => {
    fetchTicker();
    const interval = setInterval(fetchTicker, 3000);

    return () => clearInterval(interval);
  }, [coins]);

  const fetchTicker = async () => {
    try {
      const symbols = coins.map((c: any) =>
        c.symbol.replace("-", "").toUpperCase(),
      );

      const responses = await Promise.all(
        symbols.map(async (symbol: string) => {
          const res = await fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
          );

          return res.json();
        }),
      );

      const formatted: any = {};

      responses.forEach((item: any) => {
        formatted[item.symbol] = {
          price: Number(item.lastPrice),
          change: Number(item.priceChangePercent),
        };
      });

      setMarketData(formatted);
    } catch (error) {
      console.log(error);
    }
  };

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
                  src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin.coinname}.png`}
                  sx={{
                    width: 28,
                    height: 28,
                  }}
                />

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
                  {data?.price ? data.price.toLocaleString() : "--"}
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
