"use client";

import { useTicker } from "@/hook/useTicker";
import StarIcon from "@mui/icons-material/Star";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

export default function CoinHeader({ coin }: any) {
  const ticker = useTicker(coin?.symbol);

  const isUp = Number(ticker?.change || 0) >= 0;

  const formatNumber = (value: number) => {
    if (!value) return "--";

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
  };

  return (
    <Box
      sx={{
        height: 52,
        px: 2,
        background: "#0b1020",
        borderBottom: "1px solid #161b26",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{
          width: "100%",
        }}
      >
        {/* SYMBOL */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`}
            sx={{
              width: 26,
              height: 26,
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {coin?.title}
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "#2a3040",
            }}
          />

          <StarIcon
            sx={{
              fontSize: 16,
              color: "#8a8f98",
            }}
          />
        </Stack>

        {/* PRICE */}
        <Box>
          <Typography
            sx={{
              color: isUp ? "#00e676" : "#ff5252",
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1,
            }}
          >
            {formatNumber(ticker?.price)}
          </Typography>

          <Typography
            sx={{
              color: "#9aa4af",
              fontSize: 12,
              mt: 0.3,
            }}
          >
            {formatNumber(ticker?.price)}
          </Typography>
        </Box>

        {/* CHANGE */}
        <Box>
          <Typography
            sx={{
              color: "#7d8592",
              fontSize: 12,
            }}
          >
            24H Biến đổi
          </Typography>

          <Typography
            sx={{
              color: isUp ? "#00e676" : "#ff5252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          </Typography>
        </Box>

        {/* HIGH */}
        <Box>
          <Typography
            sx={{
              color: "#7d8592",
              fontSize: 12,
            }}
          >
            24H Giá cao nhất
          </Typography>

          <Typography
            sx={{
              color: "#00e676",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {formatNumber(ticker?.high)}
          </Typography>
        </Box>

        {/* LOW */}
        <Box>
          <Typography
            sx={{
              color: "#7d8592",
              fontSize: 12,
            }}
          >
            24H Giá thấp nhất
          </Typography>

          <Typography
            sx={{
              color: "#ff5252",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {formatNumber(ticker?.low)}
          </Typography>
        </Box>

        {/* VOLUME */}
        <Box>
          <Typography
            sx={{
              color: "#7d8592",
              fontSize: 12,
            }}
          >
            24H Khối lượng giao dịch
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
