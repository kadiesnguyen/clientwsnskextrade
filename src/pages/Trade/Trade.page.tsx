"use client";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  getBuySellConfig,
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const { user } = useAuth();
  const [selectedCoin, setSelectedCoin] = useState<Icoin>({
    coinname: "btc",
    id: 1,
    name: "btcusdt",
    sort: 1,
    status: 1,
    symbol: "btc-usdt",
    title: "BTC/USDT",
  });

  const [listCoin, setListCoin] = useState<Icoin[] | null>(null);
  const [coin, setCoin] = useState<any>("BTCUSDT");
  const [symbol, setSymbol] = useState<any>("btc-usdt");
  const [coinTitle, setCoinTitle] = useState<any>("BTC/USDT");
  const [value, setValue] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [progressContract, setProgressContract] = useState<any>(null);
  const [trade, setTrade] = useState<any>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
  console.log("list", listCoin);
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
  const handleClick = (coin: any) => {
    if (coin) {
      setCoinTitle(coin);
      const [base, quote] = coin.split("/");
      setCoin(base + quote);
    }
  };
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
          height: "900px",
          pt: 1,
        }}
      >
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
              display: {
                xs: "none",
                sm: "block",
              },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                background: "#000",
              }}
            >
              {/* LEFT */}
              <CoinSidebar
                coins={listCoin}
                selectedCoin={selectedCoin}
                onSelect={setSelectedCoin}
              />

              {/* RIGHT */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "1px solid #111",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <TradingChart symbol={selectedCoin?.name} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
