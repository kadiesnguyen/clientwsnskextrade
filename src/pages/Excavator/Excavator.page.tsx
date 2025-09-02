"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import useAuth from "@/hook/useAuth";
import { buyMining, getOrepool } from "@/services/User.service";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ExcavatorPage() {
  const { t } = useTranslation();
  const [orepool, setOrepool] = useState<any>(null);
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const router = useRouter();
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getOrepool();
        if (res.status === true) {
          setOrepool(res.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  const handleSubmit = async (item: any) => {
    if (!user) {
      toast.error(t("Toast.mining1"));
      return;
    }
    if (Number(user.balance.usdt) < Number(item.pricenum)) {
      router.push("/asset");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", item.id);
      await buyMining(formData);
      toast.success(t("Toast.mining2"));
    } catch (error: any) {
      toast.error(t("Toast.mining3"));
    }
  };
  return (
    <Box sx={{ width: "100%", p: 1, backgroundColor: "#000", height: "100vh" }}>
      <Typography
        sx={{
          color: "white",
          fontWeight: "600",
          textAlign: "center",
          fontSize: "25px",

          pt: {
            xs: "50px",
            sm: "100px",
          },
          pb: "20px",
        }}
      >
        {" "}
        {t("MiningPage.title")}
      </Typography>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: {
            xs: "block",
            sm: "flex",
          },
          gap: "10px",
          pb: "50px",
        }}
        justifyContent={"center"}
      >
        {orepool?.list &&
          orepool.list.map((item: any, index: number) => (
            <Box
              key={index}
              sx={{
                borderRadius: "10px",
                width: {
                  xs: "100%",
                  sm: "30%",
                },
                border: "1px solid gray",
                p: 2,
                display: "flex",
                gap: "10px",
                mt: "10px",
              }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Image
                src={"/images/iconket.png"}
                width={150}
                height={50}
                alt=""
                style={{
                  objectFit: "contain",
                  width: "100px",
                  height: "100px",
                }}
              />
              <Box sx={{ display: "grid" }}>
                {item.jlcoin == "vnd" ? (
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "15px",
                        sm: "18px",
                      },
                    }}
                  >
                    {t("MiningPage.title1")}
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "15px",
                        sm: "18px",
                      },
                    }}
                  >
                    {t("MiningPage.title2")}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.rate")}: {item.suanl}%
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.time")}: 30
                  {t("MiningPage.date")}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: {
                      xs: "14px",
                      sm: "18px",
                    },
                  }}
                >
                  {t("MiningPage.note")}
                </Typography>
                <Button
                  sx={{
                    p: "2px 5px",
                    background: "#fcd534",
                    textTransform: "capitalize",
                    fontSize: "14px",
                    color: "black",
                    "&:hover": {
                      background: "#fcd534",
                    },
                  }}
                >
                  {t("MiningPage.button")}
                </Button>
              </Box>
            </Box>
          ))}
        <Box></Box>
      </Box>
    </Box>
  );
}
