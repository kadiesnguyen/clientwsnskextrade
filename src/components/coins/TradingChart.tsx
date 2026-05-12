"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

export default function TradingChart({
  symbol,
  interval,
}: {
  symbol: string;
  interval: string;
}) {
  const container = useRef<HTMLDivElement>(null);

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
