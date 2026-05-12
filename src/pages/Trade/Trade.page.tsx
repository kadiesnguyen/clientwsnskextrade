"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  createOrder,
  getBuySellConfig,
  getContractjc,
  getListCoin,
  getOrderResult,
  getProgressContract,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import CoinSidebar from "@/components/coins/CoinSidebar";
import CoinHeader from "@/components/coins/CoinHeader";
import TradingChart from "@/components/coins/TradingChart";
import TradeForm, { ITypeTrade } from "@/components/coins/TradeForm";
import CommandOpen from "../Contact/CommandOpen";
import { useUserStore } from "@/stores/useUserStore";
import { IHistoryOpen } from "@/shared/interfaces";
import TradePopup from "@/components/popup/TradePopup";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";

export interface Icoin {
  coinname: string;
  id: number;
  name: string;
  sort: number;
  status: number;
  symbol: string;
  title: string;
}

export default function TradePage() {
  const { t } = useTranslation();
  const { user, fetchUser } = useUserStore();
  const [selectedCoin, setSelectedCoin] = useState<Icoin>({
    coinname: "btc",
    id: 1,
    name: "btcusdt",
    sort: 1,
    status: 1,
    symbol: "btc-usdt",
    title: "BTC/USDT",
  });

  const [tab, setTab] = useState("BUY");
  const [openTrade, setOpenTrade] = useState(false);
  const [listCoin, setListCoin] = useState<Icoin[] | null>(null);
  const [symbol, setSymbol] = useState<any>("btc-usdt");
  const [history, setHisstory] = useState<IHistoryOpen[]>([]);
  const [result, setResult] = useState<any>(null);
  const [progressContract, setProgressContract] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const fetchData = async () => {
      const resCoin: any = await getListCoin();

      // Xử lý danh sách coin
      if (resCoin.data) {
        setListCoin(resCoin.data);
        setSelectedCoin(resCoin.data[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API lấy danh sách coin và cấu hình mua bán
        const [buySellConfig, result] = await Promise.all([
          getBuySellConfig(),
          getProgressContract(),
        ]);

        // Xử lý progress contract
        if (result && result.data) {
          const fixedSellTimeStr = result.data.selltime.replace(
            /\.\d{6}Z$/,
            "Z",
          );
          const sellTime = new Date(fixedSellTimeStr).getTime();
          const now = Date.now();
          const remainingSeconds = Math.floor((sellTime - now) / 1000);

          if (remainingSeconds > 0) {
            setProgressContract(result.data);
            setCountdown(remainingSeconds);
          } else {
            setProgressContract(null);
            setCountdown(null);
          }
        } else {
          setProgressContract(null);
          setCountdown(null);
        }
      } catch (error: any) {
        // console.error("Error fetching data:", error);
        // toast.error(error?.message || "Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev && prev <= 1) {
          clearInterval(interval);
          setProgressContract(null);

          setTimeout(() => {
            fetchResult();
          }, 4000);

          return 0;
        }
        return (prev ?? 0) - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const historyOpen = async () => {
    try {
      const his: any = await getContractjc();
      if (his.status === true) {
        setHisstory(his.data);
      }
    } catch (errors: any) {
      console.log(errors?.message);
    }
  };

  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => {
        resolve(); // Tiếp tục thực thi thay vì reject
      };
    });
  };

  const handleSubmit = async (data: ITypeTrade) => {
    if (user?.rzstatus !== 2) {
      toast.error(t("Toast.buysell5"));
      return;
    }

    if (!data.hytime || !data.price) {
      toast.error(t("Toast.buysell1"));
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ctime", data.hytime);
      formData.append("amount", String(data.price));
      formData.append("coinname", symbol.replace("usdt", "-usdt"));
      formData.append("method", data.method);
      formData.append("uprate", data.hyykbl);

      const res = await createOrder(formData);

      if (res?.data) {
        fetchResult();
      }

      // onClose();
      // toast.success(t("Toast.buysell3"));
    } catch (error) {
      toast.error(t("Toast.buysell4"));
    }
  };

  const fetchResult = async () => {
    try {
      const tradeId = window.localStorage.getItem("tradeId");

      if (!tradeId || !progressContract?.id) {
        throw new Error("Missing trade ID or progress contract ID");
      }

      const res = await getOrderResult(progressContract.id);

      setResult(res.data);
      setCountdown(null);
      setTrade(null);
      await preloadImage("/images/thongbao.png");
      setShowPopup(true);
    } catch (error: any) {
      toast.error(t("Toast.buysell"));
    }
  };
  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false); // Ẩn popup sau 5 giây
        setResult(null); // Reset kết quả nếu cần
      }, 5000);

      return () => clearTimeout(timeout); // Clear khi component unmount hoặc showPopup thay đổi
    }
  }, [showPopup]);

  const fetchProgressContract = async () => {
    try {
      const res: any = await getProgressContract();
      if (res.data) {
        const fixedSellTimeStr = res.data.selltime.replace(/\.\d{6}Z$/, "Z");
        const sellTime = new Date(fixedSellTimeStr).getTime();
        const now = Date.now();
        const remainingSeconds = Math.floor((sellTime - now) / 1000);

        if (remainingSeconds > 0) {
          setProgressContract(res.data);
          setCountdown(remainingSeconds);
        } else {
          setProgressContract(null);
          setCountdown(null);
        }
      } else {
        setProgressContract(null);
        setCountdown(null);
      }
    } catch (error) {
      console.error("Error fetching progress contract:", error);
      setProgressContract(null);
    }
  };
  return (
    <Box sx={{ background: "#000", paddingTop: { xs: "0px", sm: "70px" } }}>
      <Box
        sx={{
          pt: 1,
        }}
      >
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <IconButton href="/">
            <PreviousIcon width="20px" height="20px" />
          </IconButton>
        </Box>
        <CoinHeader coin={selectedCoin} />
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "280px 1fr",
                },
                background: "#000",
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <CoinSidebar
                  coins={listCoin}
                  selectedCoin={selectedCoin}
                  onSelect={setSelectedCoin}
                />
              </Box>

              {/* RIGHT */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid #111",
                  overflowY: "auto",
                  background: "#0E1316",
                }}
              >
                <Box sx={{ minHeight: { sm: "550px", xs: "400px" } }}>
                  <TradingChart symbol={selectedCoin?.name} />
                </Box>
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "block",
                    },
                  }}
                >
                  <TradeForm onSubmit={handleSubmit} user={user} />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: {
                        xs: "20px 10px",
                        sm: "20px 40px",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        borderBottom: "2px solid white",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: 600,
                        p: 1,
                      }}
                    >
                      {t("HistoryPage.tab1")} (0)
                    </Typography>
                    <Button
                      sx={{
                        display: "flex",
                        gap: "5px",
                        background: "#ffffff0d",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 20px",
                        textTransform: "capitalize",
                      }}
                    >
                      <img
                        src={"/images/history-icon.png"}
                        width={20}
                        height={20}
                        alt=""
                      />
                      Lịch sử
                    </Button>
                  </Box>

                  <CommandOpen
                    user={user}
                    history={history}
                    onCLose={() => {
                      historyOpen();
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    p: 2,
                    display: {
                      xs: "block",
                      sm: "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: 2,
                    }}
                  >
                    <Button
                      sx={{
                        width: "48%",
                        height: "40px",
                        background: "#2dd4bf",
                        textTransform: "none",
                        color: "black",
                        "&:hover": { background: "#2dd4bf" },
                      }}
                      onClick={() => {
                        setOpenTrade(true);
                        setTab("BUY");
                      }}
                    >
                      {t("BuySellPage.buy")}
                    </Button>
                    <Button
                      sx={{
                        width: "48%",
                        height: "40px",
                        background: "#ef4444",
                        textTransform: "none",
                        color: "white",
                        "&:hover": { background: "#ef4444" },
                      }}
                      onClick={() => {
                        setOpenTrade(true);
                        setTab("SELL");
                      }}
                    >
                      {t("BuySellPage.sell")}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {user && (
        <TradePopup
          open={openTrade}
          user={user}
          tab={tab}
          history={history}
          onLoadHitory={() => {
            historyOpen();
          }}
          onClose={() => {
            setOpenTrade(false);
            fetchUser();
            historyOpen();
          }}
          symbol={selectedCoin.name}
        />
      )}
    </Box>
  );
}
