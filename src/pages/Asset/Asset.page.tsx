"use client";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { getMyWallet } from "@/services/User.service";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface CountryType {
  id: string;
  name: string;
  title: string;
  addresss: string;
  bank: number;
  suggested?: boolean;
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

export default function AssetPage() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [value, setValue] = useState(0);
  const [wallet, setWallet] = useState<CountryType[] | []>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getMyWallet();
        if (res.status === true) {
          setWallet(res.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#000",

        paddingTop: {
          xs: "10px",
          sm: "80px",
        },
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: {
            xs: "block",
            sm: "flex",
          },
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Box sx={{ width: { xs: "80%", sm: "40%" } }}>
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "30px",
              },
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            P2P Express Buy USDT with USD
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "80%", sm: "40%" },
            margin: "0 auto",
            boxShadow: "0px 0px 10px rgba(172, 172, 172, 0.1)",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Buy" {...a11yProps(0)} />
              <Tab label="Sell" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Autocomplete
              id="country-select-demo"
              sx={{ padding: "20px 0px" }}
              options={wallet}
              autoHighlight
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => {
                setbank(newValue?.bank || 0);
                setAddress(newValue?.addresss || "");
              }}
              renderOption={(props, option) => {
                const { ...optionProps } = props;
                return (
                  <Box
                    key={option.id}
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                  >
                    {option.name === "pi" ? (
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp`}
                        src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                        alt=""
                      />
                    ) : (
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`/images/usdt.png`}
                        src="/images/usdt.png"
                        alt=""
                      />
                    )}
                    {option.title}
                  </Box>
                );
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label="Select currency"
                  slotProps={{
                    htmlInput: {
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    },
                  }}
                />
              )}
            />
            {bank > 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={method.toString()}
                  label="Method"
                  onChange={(event: SelectChangeEvent) =>
                    setMethod(Number(event.target.value))
                  }
                >
                  <MenuItem value={1}>Bank Transfer</MenuItem>
                  <MenuItem value={2}>Transfer coins to the wallet</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Method</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={method.toString()}
                  label="Method"
                  onChange={(event: SelectChangeEvent) =>
                    setMethod(Number(event.target.value))
                  }
                >
                  <MenuItem value={2}>Transfer coins to the wallet</MenuItem>
                </Select>
              </FormControl>
            )}
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              sx={{ margin: "20px 0", width: "100%" }}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
