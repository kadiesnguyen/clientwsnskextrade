"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import swal from "sweetalert";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useAuth from "@/hook/useAuth";
import TradingViewHotlists from "@/components/ChartView/TradingViewHotlists";
import { CoinIcon, SearchIcon } from "@/shared/Svgs/Svg.component";
import { CloseOutlined, Search } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatMoney";
import { getWebsiteConfig } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import CoinPage from "@/components/coins/CoinPage";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const route = useRouter();
  useEffect(() => {
    const referral = async () => {
      try {
        const buySellConfig: any = await getWebsiteConfig();
        if (buySellConfig) {
          setWebsiteConfig(buySellConfig.data);
        }

        const hasShownPopup = sessionStorage.getItem("popupShown");

        if (
          user &&
          !hasShownPopup &&
          buySellConfig.data.checkin_notify_status === 1
        ) {
          setShowPopup(true);
          sessionStorage.setItem("popupShown", "true");

          // Auto close sau 10 giây (tuỳ chỉnh)
          setTimeout(() => {
            setShowPopup(false);
          }, 10000);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };

    if (!loading) {
      referral();
    }
  }, [user, loading]);

  return (
    <div className="home">
      <div className="home-mobile">
        <Box>
          <Box
            sx={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <Image
              src={"/images/banner.jpg"}
              width={368}
              height={212}
              alt=""
              style={{
                width: "90%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              mt: "20px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #22b65a",
                  background: "#1f2937",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Image
                  src={"/images/icon-service.png"}
                  width={25}
                  height={25}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "white",
                  textAlign: "center",
                }}
              >
                {t("HomePage.service")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #22b65a",
                  background: "#1f2937",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Image
                  src={"/images/verified.png"}
                  width={25}
                  height={25}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                sx={{ fontSize: 12, color: "white", textAlign: "center" }}
              >
                {t("HomePage.verified")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #22b65a",
                  background: "#1f2937",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Image
                  src={"/images/recharge.png"}
                  width={25}
                  height={25}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                sx={{ fontSize: 12, color: "white", textAlign: "center" }}
              >
                {t("HomePage.recharge")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #22b65a",
                  background: "#1f2937",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Image
                  src={"/images/wallet.png"}
                  width={25}
                  height={25}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "white",
                  width: "70px",
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                {t("HomePage.regulatory")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #22b65a",
                  background: "#1f2937",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <Image
                  src={"/images/loan.png"}
                  width={25}
                  height={25}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography
                sx={{ fontSize: 12, color: "white", textAlign: "center" }}
              >
                {t("HomePage.loan")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%", margin: "auto" }}>
            <CoinPage />
          </Box>
          <Box sx={{ width: "90%", margin: "20px auto" }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
              }}
            >
              About Us
            </Typography>
            <Typography variant="body1" sx={{ color: "white", mt: "15px" }}>
              We are a leading trading platform dedicated to providing safe,
              efficient and reliable digital asset trading services. Our mission
              is to provide advanced cryptocurrency trading experiences to
              global users and promote the development and innovation of the
              digital asset market.
            </Typography>
            <Image
              src={"./images/about-us.jpg"}
              width={340}
              height={340}
              alt="l"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                margin: "15px 0px",
                borderRadius: "20px",
              }}
            />
            <Typography
              variant="body1"
              sx={{ color: "white", mt: "15px", pb: "60px" }}
            >
              In the field of digital currency, we are committed to becoming a
              leading innovator and industry benchmark. Our vision is to build a
              world-leading digital asset trading platform through technological
              innovation and service excellence, providing users with the best
              trading experience and the most comprehensive selection of digital
              assets.
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}
