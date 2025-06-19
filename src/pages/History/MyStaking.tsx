"use client";
import LinearWithValueLabel from "@/components/Input/LinearWithValueLabel";
import useAuth from "@/hook/useAuth";
import {
  getContractjc,
  getContractpc,
  getMyStaking,
  getNormalmin,
  getOverduemin,
} from "@/services/User.service";
import {
  NotFoundIcon,
  UserIcon,
  VerifiedIcon,
  WarningIcon,
} from "@/shared/Svgs/Svg.component";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
export default function MyStaking() {
  const { user } = useAuth();
  const [history, setHisstory] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getMyStaking();
        if (res.status === true) {
          setHisstory(res.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
            alignItems: "center",
            gap: 2, // Space between elements
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: {
                xs: 3,
                sm: 2,
              },
              paddingBottom: {
                xs: "10px",
                sm: "0px",
              },
            }}
          >
            <Avatar
              src={user?.username} // Replace with actual profile image path
              alt={user?.username}
              sx={{
                width: {
                  xs: 50,
                  sm: 80,
                },
                height: {
                  xs: 50,
                  sm: 80,
                },
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                borderRight: {
                  xs: "none",
                  sm: "1px solid #ccc",
                },
                paddingRight: 2,
                marginRight: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: {
                    xs: "16px",
                    sm: "25px",
                  },
                  color: "#fff",
                }}
              >
                {user?.username}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "13px",
                    sm: "18px",
                  },
                  color: "lightgrey",
                }}
              >
                {user?.phone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Email
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.username} </Typography>
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Identity verification
              </Typography>
              {user?.rzstatus === 0 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",

                    gap: "5px",
                  }}
                >
                  <WarningIcon /> The customer account has not been verified.
                </Typography>
              ) : user?.rzstatus === 1 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> Pending approval
                </Typography>
              ) : user?.rzstatus === 2 ? (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <VerifiedIcon /> Account has been verified
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",

                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> Verified failed
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Country/Region
              </Typography>
              <Typography sx={{ color: "#fff" }}>{user?.addr} </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "grid",
                },
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Trading fee tier
              </Typography>
              <Typography sx={{ color: "#fff" }}>Regular user</Typography>
            </Box>
          </Box>
        </Box>
        <Grid container spacing={1}>
          {/* Left Section */}
          <Grid item xs={12} sm={12}>
            <StyledPaper
              sx={{
                display: "grid",
                gap: 2,
                background: "#000",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  mb: 3,
                  color: "#fff",
                }}
              >
                My Staking
              </Typography>
              {history && history.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                  {history.map((item: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "calc(50% - 20px)",
                        },
                        border: "1px solid #909090",
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ marginTop: "10px", color: "#fff" }}
                        >
                          {item.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            Purchase: {item.num}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            Amount percent : {item.percent}%
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            Add time : {formatDateTime(item.addtime)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            End time : {formatDateTime(item.endtime)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            End day : {formatDateTime(item.endday)}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: "#666", fontSize: "14px" }}
                          >
                            Status:{" "}
                            {item.status === 1
                              ? "Currently staking"
                              : "Completed"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box
                  sx={{ width: "100%", textAlign: "center", padding: "20px" }}
                >
                  <NotFoundIcon width="100px" height="100px" />
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    No overdue mining activities found.
                  </Typography>
                </Box>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
