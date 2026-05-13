"use client";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useMemo, useState } from "react";

export default function InvestPopup({ open, onClose, data }: any) {
  const [amount, setAmount] = useState("");

  const estimatedProfit = useMemo(() => {
    const value = Number(amount || 0);

    if (!value) return 0;

    return (value * Number(data?.dayrate || 0)) / 100;
  }, [amount, data]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-container": {
          alignItems: {
            xs: "flex-end",
            sm: "center",
          },
        },
      }}
      PaperProps={{
        sx: {
          background: "#111827",

          borderRadius: {
            xs: "24px 24px 0 0",
            sm: "24px",
          },

          margin: {
            xs: 0,
            sm: 2,
          },

          width: "100%",

          maxHeight: {
            xs: "90vh",
            sm: "85vh",
          },

          overflowY: "auto",

          WebkitOverflowScrolling: "touch",

          "&::-webkit-scrollbar": {
            width: "4px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.15)",
            borderRadius: "10px",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 2.5,
            py: 2,

            borderBottom: "1px solid rgba(255,255,255,0.06)",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            Đầu tư máy đào
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Box>

        {/* BODY */}
        <Box
          sx={{
            p: 2.5,
          }}
        >
          {/* CARD */}
          <Box
            sx={{
              background: "#1f2937",

              borderRadius: "20px",

              p: 2.5,
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              {data?.title}
            </Typography>

            <Stack direction="row" spacing={1} mt={2}>
              <Chip
                label={`${data?.percent}%`}
                sx={{
                  background: "#00c97b",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />

              <Chip
                label={`${data?.day} ngày`}
                sx={{
                  background: "#00c97b",
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
            </Stack>

            <Stack spacing={2} mt={3}>
              <InfoRow
                label="Phạm vi đầu tư"
                value={`${Number(data?.min).toLocaleString()} - ${Number(
                  data?.max,
                ).toLocaleString()} USDT`}
              />

              <InfoRow
                label="Thu nhập hàng ngày"
                value={`${data?.dayrate}%`}
                valueColor="#ff3355"
              />

              <InfoRow
                label="Số dư khả dụng"
                value="0 USDT"
                valueColor="#00e676"
              />
            </Stack>
          </Box>

          {/* INPUT */}
          <Box mt={4}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                mb: 2,
              }}
            >
              Số tiền đầu tư
            </Typography>

            <Box
              sx={{
                height: 58,

                borderRadius: "18px",

                border: "1px solid rgba(255,255,255,0.2)",

                px: 2,

                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="standard"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Vui lòng nhập số tiền"
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  flex: 1,

                  "& input": {
                    color: "#fff",
                    fontSize: 16,
                  },

                  "& input::placeholder": {
                    color: "#94a3b8",
                    opacity: 1,
                  },
                }}
              />

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                USDT
              </Typography>
            </Box>

            {/* PROFIT */}
            <Box mt={3}>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                Lợi nhuận dự kiến
              </Typography>

              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  mt: 1,
                }}
              >
                {estimatedProfit.toFixed(2)} USDT
              </Typography>
            </Box>
          </Box>

          {/* BUTTON */}
          <Button
            fullWidth
            sx={{
              mt: 5,

              height: 56,

              borderRadius: "16px",

              background: "linear-gradient(90deg,#47e0a1 0%, #12c87b 100%)",

              color: "#fff",

              fontWeight: 700,

              fontSize: 18,

              textTransform: "none",

              "&:hover": {
                background: "linear-gradient(90deg,#47e0a1 0%, #12c87b 100%)",
              },
            }}
          >
            Ủy thác ngay
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value, valueColor = "#fff" }: any) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        sx={{
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          color: valueColor,
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
