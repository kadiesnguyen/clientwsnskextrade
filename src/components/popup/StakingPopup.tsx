"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
} from "@mui/material";
import { IOrepoolIterm, IStaking } from "@/shared/interfaces";
import { buySubscribe } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface progs {
  open: boolean;
  data: IStaking | null;
  onSubmit: () => void;
  onClose: () => void;
}
export default function StakingPopup({ data, onClose, open, onSubmit }: progs) {
  const { t, i18n } = useTranslation();
  const [amount, setAmount] = useState<string>("");
  const handleInvest = async () => {
    if (amount && data) {
      const formData = new FormData();
      formData.append("pid", String(data.id));
      formData.append("amount", amount);
      await buySubscribe(formData)
        .then((res) => {
          if (res.status) {
            toast.success(t(`Toast.staking`));
          }
        })
        .catch((err) => {
          toast.error(t(`Toast.staking1`));
        })
        .finally(() => {
          onSubmit();
        });
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background: "#1e293b",
          color: "white",
          width: "420px",
        },
      }}
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography fontWeight="bold" fontSize="18px">
            {t("HistoryPage.Purchase")} {data?.open} {t("MiningPage.date")}
          </Typography>

          <Typography fontSize="13px" color="#94a3b8">
            {t("StakingPage.amount")} (USDT)
          </Typography>

          <TextField
            placeholder={"Min: " + Number(data?.min).toLocaleString() + " USDT"}
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="small"
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                background: "#0f172a",
              },
            }}
          />

          <Typography fontSize="12px" color="#94a3b8">
            {t("MiningPage.Average")}: {data?.percent}%
          </Typography>

          <Box display="flex" gap={2}>
            <Button
              fullWidth
              onClick={onClose}
              sx={{
                background: "#374151",
                borderRadius: "10px",
                textTransform: "capitalize",
                color: "white",
                "&:hover": {
                  background: "#374151",
                },
              }}
            >
              {t("MiningPage.Cancel")}
            </Button>

            <Button
              fullWidth
              onClick={handleInvest}
              sx={{
                background: "#22c55e",
                borderRadius: "10px",
                textTransform: "capitalize",
                color: "white",
                "&:hover": {
                  background: "#22c55e",
                },
              }}
            >
              {t("HistoryPage.Purchase")}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
