"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

const TIMEFRAMES = [
  {
    label: "1m",
    value: "1",
    min: 10,
    max: 100,
    percent: 5,
  },
  {
    label: "5m",
    value: "5",
    min: 30,
    max: 300,
    percent: 8,
  },
  {
    label: "15m",
    value: "15",
    min: 50,
    max: 500,
    percent: 12,
  },
  {
    label: "1H",
    value: "60",
    min: 100,
    max: 1000,
    percent: 18,
  },
  {
    label: "4H",
    value: "240",
    min: 200,
    max: 2000,
    percent: 25,
  },
  {
    label: "1D",
    value: "D",
    min: 500,
    max: 5000,
    percent: 40,
  },
  {
    label: "1W",
    value: "W",
    min: 1000,
    max: 10000,
    percent: 60,
  },
];

export default function TradingChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  const [interval, setInterval] = useState("15");

  const currentConfig = useMemo(() => {
    return TIMEFRAMES.find((item) => item.value === interval);
  }, [interval]);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    // widget wrapper
    const widget = document.createElement("div");

    widget.className = "tradingview-widget-container__widget";

    widget.style.width = "100%";
    widget.style.height = "100%";

    // script
    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `OKX:${symbol}`,
      interval,

      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "Vi",

      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,

      allow_symbol_change: false,
      save_image: false,

      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(widget);
    container.current.appendChild(script);
  }, [symbol, interval]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        background: "#000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: 2,
          height: 42,
          display: "flex",
          alignItems: "center",

          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",

          background: "#111",

          overflowX: "auto",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          sx={{
            minWidth: "max-content",
          }}
        >
          {TIMEFRAMES.map((item) => {
            const active = interval === item.value;

            return (
              <Box
                key={item.value}
                onClick={() => setInterval(item.value)}
                sx={{
                  position: "relative",

                  cursor: "pointer",

                  fontSize: 13,
                  fontWeight: active ? 700 : 500,

                  color: active ? "#fff" : "rgba(255,255,255,0.55)",

                  transition: "0.2s",

                  userSelect: "none",

                  "&:hover": {
                    color: "#fff",
                  },

                  "&::after": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: -10,
                        width: "100%",
                        height: "2px",
                        background: "#1976d2",
                        borderRadius: 999,
                      }
                    : {},
                }}
              >
                {item.label}
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* CHART */}
      <Box
        ref={container}
        className="tradingview-widget-container"
        sx={{
          flex: 1,
          minHeight: 0,
          background: "#111",
        }}
      />
    </Box>
  );
}
