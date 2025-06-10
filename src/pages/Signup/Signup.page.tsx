"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";

export default function SignupPage() {
  const [phone, setPhone] = useState("+84");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Phone:", phone);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Left Section */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "black",
          color: "white",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mt: 4, textAlign: "center" }}
          >
            Trade with confidence
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              color: "#909090",
              width: "60%",
              margin: "0 auto",
            }}
          >
            We don’t lend out customer funds, which is verified through our
            regularly published Proof of Reserves audits.
          </Typography>
        </Box>
        <Box sx={{ mb: 4, mt: 2 }}>
          <img
            src="/images/5AD5609D76BF42F4.webp"
            alt="Trading App"
            style={{
              height: "323px",
              margin: "0 auto",
              display: "block",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: "#1a1a1a",
            p: 2,
            borderRadius: "8px",
            width: "60%",
            margin: "0 auto",
            marginTop: "-30px",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ color: "white", fontSize: "20px" }}
          >
            Join our Telegram group
          </Typography>
          <Typography variant="body2" color="gray">
            Ask questions, get answers, and chat with other traders to shape the
            crypto future together
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          width: "50%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "400px", width: "100%" }}>
          <Typography variant="h4" gutterBottom>
            Enter your email
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputLabel>Email </InputLabel>
            <TextField
              fullWidth
              placeholder="Enter Email"
              variant="outlined"
              sx={{ mb: 2, borderRadius: "15px" }}
            />

            <InputLabel>Referral code (optional) </InputLabel>
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              sx={{ mb: 2, borderRadius: "15px" }}
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: "#000",
                borderRadius: "15px",
                color: "white",
                "&:hover": { backgroundColor: "#000", color: "white" },
              }}
            >
              Sign up
            </Button>
            <div
              className="ThirdPartyLogin_title__wLNO7"
              style={{ textAlign: "center", padding: "10px 0" }}
            >
              <span>or continue with</span>
            </div>
            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/google.webp"
                    alt="Google"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/apple.webp"
                    alt="Apple"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  style={{
                    borderRadius: "50%",
                    minWidth: "50px",
                    height: "50px",
                    border: "0.5px solid #000",
                  }}
                >
                  <img
                    src="/images/wallet.webp"
                    alt="Wallet"
                    style={{ width: "24px", height: "24px" }}
                  />{" "}
                  {/* Replace with actual icon path */}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
