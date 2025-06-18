"use client";
import useAuth from "@/hook/useAuth";
import { VerifiedIcon, WarningIcon } from "@/shared/Svgs/Svg.component";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function AccountPage() {
  const { user, loading } = useAuth();
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "auto",
          display: {
            xs: "block",
            sm: "flex",
          },
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <Box>
          <Avatar
            src={user?.username}
            alt={user?.username}
            sx={{
              width: 100,
              height: 100,
              margin: {
                xs: "0 auto ",
                sm: "",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "70%",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "600", color: "#fff" }}
          >
            Personal info
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              borderBottom: "1px solid #e0e0e0",
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Nickname
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "#fff" }}>
              {user?.username || "test@gmail.com"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Phone
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "16px" }}>
              {user?.phone || "0918188172727"}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{ fontSize: "25px", fontWeight: "600", color: "#fff" }}
          >
            Verification info
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              borderBottom: "1px solid #e0e0e0",
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Identity verification
            </Typography>
            <Box>
              {user?.rzstatus === 0 ? (
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> The customer account has not been verified.
                </Typography>
              ) : user?.rzstatus === 1 ? (
                <Typography
                  sx={{
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> Pending approval
                </Typography>
              ) : user?.rzstatus === 2 ? (
                <Typography
                  sx={{
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <VerifiedIcon /> Account has been verified
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    paddingTop: "10px",
                    color: "#fff",
                    gap: "5px",
                  }}
                >
                  <WarningIcon /> Verified failed
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Country/Region
            </Typography>
            <Typography sx={{ color: "#fff", fontSize: "16px" }}>
              {user?.addr || "Vietnam"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
