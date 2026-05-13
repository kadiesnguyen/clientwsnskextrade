"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buyMining, getOrepool } from "@/services/User.service";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { PreviousIcon } from "@/shared/Svgs/Svg.component";
import Image from "next/image";

export default function ExcavatorPage() {
  const { t } = useTranslation();

  const [stakingData, setStakingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { user, fetchUser } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchStakingData();
  }, []);

  const fetchStakingData = async () => {
    try {
      setLoading(true);

      const res: any = await getOrepool();

      if (res) {
        setStakingData({
          overview: res.data.overview || [],
          mylist: res.data.mylist || [],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

      fetchStakingData();
      fetchUser();
    } catch (error) {
      toast.error(t("Toast.mining3"));
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top, #07111a 0%, #061018 35%, #040b12 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const myList = stakingData?.mylist || [];

  const totalProfit = myList.reduce((sum: number, item: any) => {
    return sum + Number(item.outusdt || 0);
  }, 0);

  const todayProfit = myList.reduce((sum: number, item: any) => {
    return sum + Number(item.outnum || 0);
  }, 0);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #07111a 0%, #061018 35%, #040b12 100%)",

        pb: {
          xs: "90px",
          md: "120px",
        },
      }}
    >
      {/* CONTAINER */}
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "92%",
            md: "85%",
            lg: "80%",
          },

          mx: "auto",

          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },

          pt: {
            xs: 2,
            md: 5,
          },
          pb: {
            xs: 5,
            md: 0,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: {
              xs: "flex",
              sm: "none",
            },
            justifyContent: "space-between",
            textAlign: "center",
            borderBottom: "1px solid hsla(0,0%,100%,.050980392156862744)",
            alignItems: "center",
            height: "70px",
          }}
        >
          <IconButton onClick={() => router.back()}>
            <PreviousIcon width="25px" height="20px" />
          </IconButton>
          <Typography variant="h5" color={"white"}>
            {t("MiningPage.title1")}
          </Typography>
          <Button
            // onClick={() => router.push("/deposit/history")}
            sx={{
              "&:hover": {
                background: "#202630",
              },
            }}
          >
            <Image
              src="/images/history-deposit.png"
              width={50}
              height={50}
              alt=""
              style={{ height: "50px", objectFit: "contain" }}
            />
          </Button>
        </Box>
        {/* PROFIT CARD */}
        <Box
          sx={{
            borderRadius: {
              xs: "18px",
              md: "28px",
            },

            background: "linear-gradient(180deg,#121828 0%, #111827 100%)",

            border: "1px solid rgba(255,255,255,0.04)",

            py: {
              xs: 2,
              md: 4,
            },

            px: {
              xs: 2,
              md: 3,
            },

            mb: {
              xs: 2,
              md: 4,
            },
            mt: { xs: 0, sm: 7 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                sx={{
                  color: "#9ca3af",

                  fontSize: {
                    xs: 13,
                    md: 16,
                  },

                  fontWeight: 500,
                }}
              >
                {t("MiningPage.amount")} (USDT)
              </Typography>

              <Typography
                sx={{
                  color: "#fff",

                  mt: 1,

                  fontWeight: 700,

                  fontSize: {
                    xs: 28,
                    md: 42,
                  },
                }}
              >
                {totalProfit.toLocaleString()}
              </Typography>
            </Box>

            <Avatar
              src="/images/usdt.png"
              sx={{
                width: {
                  xs: 36,
                  md: 50,
                },

                height: {
                  xs: 36,
                  md: 50,
                },

                background: "rgba(255,255,255,0.08)",
              }}
            >
              uSDT
            </Avatar>
          </Stack>

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Typography
              sx={{
                color: "#9ca3af",

                fontSize: {
                  xs: 12,
                  md: 15,
                },
              }}
            >
              {t("MiningPage.rateM")}: {todayProfit.toLocaleString()}%
            </Typography>

            <Typography
              sx={{
                color: "#d1d5db",

                fontSize: {
                  xs: 12,
                  md: 15,
                },
              }}
            >
              {t("MiningPage.title1")}
            </Typography>
          </Stack>
        </Box>

        {/* GRID */}
        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },

            gap: {
              xs: 1.5,
              md: 3,
            },
          }}
        >
          {stakingData?.overview?.map((item: any) => (
            <Box
              key={item.id}
              sx={{
                borderRadius: {
                  xs: "16px",
                  md: "24px",
                },

                background: "linear-gradient(180deg,#161d2b 0%, #101522 100%)",

                border: "1px solid rgba(255,255,255,0.05)",

                p: {
                  xs: 1.5,
                  md: 2.5,
                },

                transition: "0.25s",

                "&:hover": {
                  md: {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                  },
                },
              }}
            >
              {/* HEADER */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: {
                      xs: 1,
                      md: 1.5,
                    },

                    minWidth: 0,
                  }}
                >
                  {/* IMAGE DESKTOP */}
                  <Box
                    component="img"
                    src={item.imgs}
                    alt={item.title}
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },

                      width: 54,
                      height: 54,

                      borderRadius: "14px",

                      objectFit: "cover",
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#fff",

                      fontWeight: 700,

                      fontSize: {
                        xs: 15,
                        md: 18,
                      },

                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                {/* RIGHT ICON */}
                <Box
                  sx={{
                    width: {
                      xs: 28,
                      md: 36,
                    },

                    height: {
                      xs: 28,
                      md: 36,
                    },

                    borderRadius: "50%",

                    background: "rgba(255,255,255,0.08)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: "#fff",

                    fontSize: {
                      xs: 16,
                      md: 20,
                    },
                  }}
                >
                  ›
                </Box>
              </Stack>

              {/* CHIP */}
              <Stack direction="row" spacing={1} mt={1.5}>
                <Chip
                  label={`${item.dayoutnum}%`}
                  size="small"
                  sx={{
                    background: "#243041",

                    color: "#fff",

                    fontWeight: 700,

                    borderRadius: "6px",

                    fontSize: 11,

                    height: 24,
                  }}
                />

                <Chip
                  label={`${item.cycle} ${t("MiningPage.date")}`}
                  size="small"
                  sx={{
                    background: "#243041",

                    color: "#fff",

                    fontWeight: 700,

                    borderRadius: "6px",

                    fontSize: 11,

                    height: 24,
                  }}
                />
              </Stack>

              {/* CONTENT DESKTOP */}
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },

                  color: "#cbd5e1",

                  mt: 2,

                  lineHeight: 1.6,

                  fontSize: 14,
                }}
              >
                {item.content}
              </Typography>

              {/* DAILY */}
              <Typography
                sx={{
                  mt: {
                    xs: 1.5,
                    md: 2,
                  },

                  color: "#fff",

                  fontSize: {
                    xs: 13,
                    md: 15,
                  },

                  fontWeight: 600,
                }}
              >
                {t("MiningPage.Average")}:{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#00d084",
                    fontWeight: 700,
                  }}
                >
                  {item.dayoutnum}%
                </Box>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: { xs: "space-between", sm: "flex-start" },
                }}
              >
                {/* INVEST */}
                <Typography
                  sx={{
                    mt: 1,

                    color: "#9ca3af",

                    fontSize: {
                      xs: 12,
                      md: 14,
                    },
                  }}
                >
                  {t("MiningPage.Invest")}:{" "}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,

                    color: "white",
                    fontWeight: 700,

                    fontSize: {
                      xs: 12,
                      md: 14,
                    },
                  }}
                >
                  {Number(item.pricenum).toLocaleString()}{" "}
                  {item.pricecoin.toUpperCase()}
                </Typography>
              </Box>

              {/* FOOTER DESKTOP */}
              <Stack
                direction="row"
                justifyContent="space-between"
                mt={2}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    {t("MiningPage.type4")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {item.cycle} {t("MiningPage.date")}
                  </Typography>
                </Box>

                <Box textAlign="right">
                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    {t("MiningPage.Minimum")}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#00e676",
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {item.buymax}
                  </Typography>
                </Box>
              </Stack>

              {/* BUTTON */}
              <Button
                fullWidth
                onClick={() => handleSubmit(item)}
                sx={{
                  mt: {
                    xs: 2,
                    md: 3,
                  },

                  height: {
                    xs: 42,
                    md: 54,
                  },

                  borderRadius: {
                    xs: "12px",
                    md: "16px",
                  },

                  background: "linear-gradient(90deg,#00d084 0%, #00b86b 100%)",

                  color: "#fff",

                  fontWeight: 700,

                  fontSize: {
                    xs: 14,
                    md: 16,
                  },

                  textTransform: "none",

                  "&:hover": {
                    background:
                      "linear-gradient(90deg,#00d084 0%, #00b86b 100%)",
                  },
                }}
              >
                {t("MiningPage.button")}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
