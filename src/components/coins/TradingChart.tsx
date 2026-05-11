"use client";

import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

export default function TradingChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `OKX:${symbol}`,
      interval: "5",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",

      hide_top_toolbar: true,
      hide_legend: true,
      hide_side_toolbar: true,

      allow_symbol_change: false,
      save_image: false,

      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, [symbol]);

  return (
    <Box
      ref={container}
      className="tradingview-widget-container"
      sx={{
        width: "100%",
        height: "100%",
        background: "#000",
      }}
    />
  );
}
