"use client";

import { useTicker } from "@/hook/useTicker";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

export default function CoinHeader({ coin, onOpenMenu }: any) {
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
        background: "#0b1020",
        borderBottom: "1px solid #161b26",
        px: 1.5,
        py: 1,
      }}
    >
      {/* ================= DESKTOP ================= */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
        sx={{
          width: "100%",
          display: {
            xs: "none",
            md: "flex",
          },
          overflow: "hidden",
          height: 52,
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
        <InfoItem
          label="24H Biến đổi"
          value={ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          color={isUp ? "#00e676" : "#ff5252"}
        />

        {/* HIGH */}
        <InfoItem
          label="24H Giá cao nhất"
          value={formatNumber(ticker?.high)}
          color="#00e676"
        />

        {/* LOW */}
        <InfoItem
          label="24H Giá thấp nhất"
          value={formatNumber(ticker?.low)}
          color="#ff5252"
        />

        {/* VOLUME */}
        <InfoItem
          label="24H Khối lượng"
          value={ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"}
          color="#fff"
        />
      </Stack>

      {/* ================= MOBILE ================= */}
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {/* TOP ROW */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={onOpenMenu}
              size="small"
              sx={{
                color: "#fff",
                p: 0.5,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Avatar
              src={`https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${coin?.coinname?.toLowerCase()}.png`}
              sx={{
                width: 24,
                height: 24,
              }}
            />

            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {coin?.title}
            </Typography>
          </Stack>
        </Stack>

        {/* BOTTOM ROW */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            mt: 1,
          }}
        >
          <MobileItem label="Open" value={formatNumber(ticker?.open)} />

          <MobileItem label="Close" value={formatNumber(ticker?.price)} />

          <MobileItem label="Low" value={formatNumber(ticker?.low)} />

          <MobileItem
            label="Volume"
            value={
              ticker?.volume ? Number(ticker.volume).toLocaleString() : "--"
            }
          />
        </Stack>
        <Stack
          direction="row"
          alignItems={"center"}
          gap={"10px"}
          sx={{
            mt: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: 30,
            }}
          >
            ${formatNumber(ticker?.price)}
          </Typography>
          <Typography
            sx={{
              color: isUp ? "#00e676" : "#ff5252",
              fontWeight: 500,
              fontSize: 14,
              background: isUp ? "#21965333" : "#21965333",
              p: "5px 10px",
              borderRadius: "8px",
            }}
          >
            {ticker?.change ? `${ticker.change.toFixed(2)}%` : "--"}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

function InfoItem({
  label,
  value,
  color,
}: {
  label: string;
  value: any;
  color: string;
}) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#7d8592",
          fontSize: 12,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function MobileItem({ label, value }: { label: string; value: any }) {
  return (
    <Box>
      <Typography
        sx={{
          color: "#7d8592",
          fontSize: 11,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          mt: 0.3,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
