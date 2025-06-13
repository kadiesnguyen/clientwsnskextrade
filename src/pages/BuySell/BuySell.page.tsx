"use client";
import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
export default function BuySellPage() {
  return (
    <Box sx={{ background: "#000", paddingTop: "70px" }}>
      <Box
        sx={{
          height: "700px",
          // padding: "20px 0",
        }}
      >
        <TradeChart />
      </Box>
    </Box>
  );
}
