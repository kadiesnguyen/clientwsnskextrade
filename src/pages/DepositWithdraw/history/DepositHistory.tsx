"use client";
import { timeAgo } from "@/pages/historyContact/HistoryContact";
import { getDepositHistory, getWithdrawHistory } from "@/services/User.service";
import { IWithdrawHistory } from "@/shared/interfaces";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { formatDateTime } from "@/utils/formatDateTime";
import Image from "next/image";

export default function DepositHistory() {
  const [history, setHitory] = useState<IWithdrawHistory[]>([]);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const listHistory = async () => {
    const res = await getDepositHistory();
    if (res.status) {
      setHitory(res.data);
    }
  };

  useEffect(() => {
    listHistory();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#141A1F",
        paddingTop: {
          xs: "0px",
          sm: "80px",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "500px" },
          backgroundColor: "#202630",
          margin: "auto",
          minHeight: { xs: "100vh", sm: "700px" },
          borderRadius: {
            xs: 0,
            sm: "16px",
          },
          padding: "16px",
          position: "relative",
          pb: {
            xs: "120px",
            sm: 0,
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          mb={3}
          gap={"10px"}
          justifyContent={"space-between"}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{ background: "#232932" }}
          >
            <ArrowBackIosNewIcon
              sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
            />
          </IconButton>
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: "white" }}>
            {t("AssetPage.deposit_history")}
          </Typography>
          <Typography></Typography>
        </Box>

        <Box sx={{ width: "95%", margin: "auto", paddingTop: "20px" }}>
          {history && history.length > 0 ? (
            history.map((item: IWithdrawHistory, index: number) => (
              <Box
                key={index}
                sx={{
                  background: "#1c2735",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  marginBottom: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  {/* LEFT */}
                  <Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: 500,
                          marginBottom: "6px",
                        }}
                      >
                        {t("DepositWithdrawPage.tab1")}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                    >
                      {t("MiningPage.date")}
                    </Typography>

                    <Typography
                      sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                    >
                      {t("DepositWithdrawPage.amount_name")}
                    </Typography>
                  </Box>

                  {/* RIGHT */}
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        fontSize: 15,
                        marginBottom: "6px",
                      }}
                    >
                      {item.coinname.toUpperCase()}- {item.wallet}
                    </Typography>
                    <Typography
                      sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                    >
                      {formatDateTime(item.addtime)}
                    </Typography>

                    <Typography
                      sx={{ color: "#9aa4b2", fontSize: 13, mt: "5px" }}
                    >
                      {Number(item.num).toLocaleString()}{" "}
                      {item.coinname.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Image
                src={"/images/nothing.png"}
                width={100}
                height={100}
                alt="nothing"
                style={{ height: "80px", objectFit: "contain" }}
              />
              <Typography
                sx={{
                  color: "#4d4d4d",
                  fontSize: "12px",
                  fontWeight: 600,
                  textAlign: "center",
                  mt: "-15px",
                }}
              >
                {t("AssetPage.no_tran")}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
