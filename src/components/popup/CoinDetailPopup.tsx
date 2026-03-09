"use client";

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Divider,
  TextField,
  IconButton,
  DialogTitle,
  List,
  ListItemButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { IFinaceBalace, IUser } from "@/shared/interfaces";
import {
  createOrder,
  getBuySellConfig,
  getListCoin,
} from "@/services/User.service";
import { useTranslation } from "react-i18next";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface Props {
  open: boolean;
  onClose: () => void;
  coin: IFinaceBalace | undefined;
  title: string;
}

export default function CoinDetailPopup({ open, onClose, coin, title }: Props) {
  const { t, i18n } = useTranslation();
  console.log("coin", coin);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100vW",
          height: "100vh",
          maxHeight: "100vh",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: "#14181d",
          color: "white",
          zIndex: 999999999,
          p: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={onClose}>
          <ArrowBackIosNewIcon sx={{ color: "white", fontSize: 14 }} />
        </IconButton>
        <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>
        <IconButton></IconButton>
      </Box>

      <Box>
        <Typography fontWeight={600} variant="h5" mb={2}>
          {coin?.title}
        </Typography>
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            p: "10px 0",
            justifyContent: "space-between",
            borderBottom: "1px solid #ffffff1a",
          }}
        >
          <Typography sx={{ color: "#9ca3af", fontSize: 13, mt: 0.8 }}>
            {t("DepositWithdrawPage.message")}
          </Typography>

          <Typography
            sx={{
              color: "#e5e7eb",
              fontSize: 13,
              mt: 0.8,
              textAlign: "right",
            }}
          >
            {Number(coin?.balance.available).toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: "10px 0",
            justifyContent: "space-between",
            borderBottom: "1px solid #ffffff1a",
          }}
        >
          <Typography sx={{ color: "#9ca3af", fontSize: 13, mt: 0.8 }}>
            {t("HistoryPage.Freeze")}
          </Typography>

          <Typography
            sx={{
              color: "#e5e7eb",
              fontSize: 13,
              mt: 0.8,
              textAlign: "right",
            }}
          >
            {Number(coin?.balance.available).toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: "10px 0",
            justifyContent: "space-between",
            borderBottom: "1px solid #ffffff1a",
          }}
        >
          <Typography sx={{ color: "#9ca3af", fontSize: 13, mt: 0.8 }}>
            {t("AssetPage.title2")}
          </Typography>
          <Typography
            sx={{
              color: "#e5e7eb",
              fontSize: 13,
              mt: 0.8,
              textAlign: "right",
            }}
          >
            {Number(coin?.balance.total).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
