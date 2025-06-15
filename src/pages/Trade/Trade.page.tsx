"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import MarketDataWidget2 from "@/components/ChartView/MarketDataWidget2";
export default function TradePage() {
  return (
    <Box
      sx={{
        background: "#fff",
        paddingTop: {
          xs: "0px",
          sm: "70px",
        },
      }}
    >
      <Box
        sx={{
          height: "800px",
          // padding: "20px 0",
        }}
      >
        <TradingViewTickerTape />
        <MarketDataWidget2 height={700} theme="dark" />
      </Box>
    </Box>
  );
}
