"use client";
import { useEffect, useRef, useState } from "react";

import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
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
import {
  getMyWallet,
  getWebsiteConfig,
  sellCoins,
  topUpCoins,
} from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import useAuth from "@/hook/useAuth";
import TradingViewTickerTape from "@/components/ChartView/TradingViewTickerTape";
import AssetChartView from "@/components/ChartView/AssetChartView";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface CountryType {
  id: number;
  name: string;
  title: string;
  addresss: string;
  bank: number;
  suggested?: boolean;
}

const medthod = [
  {
    id: 1,
    name: "Bank Transfer",
  },
  {
    id: 2,
    name: "Transfer coins to the wallet",
  },
];
const medthodWallet = [
  {
    id: 2,
    name: "Transfer coins to the wallet",
  },
];

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
  const [coin, setCoin] = useState<string>();
  const [bank, setbank] = useState(0);
  const [method, setMethod] = useState(0);
  const [value, setValue] = useState(0);
  const [wallet, setWallet] = useState<CountryType[] | []>([]);
  const [configs, setConfigs] = useState<any>();
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAddress("");
    setAmount("");
    setCoin("");
    setMethod(0);
    setbank(0);
  };

  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getMyWallet();
        const config: any = await getWebsiteConfig();
        if (res.status === true) {
          setWallet(res.data);
        }
        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);

  const handleSubmit = async () => {
    if (!frontImage) {
      toast.warning("Please upload the transaction image.");
      return;
    }
    if (!amount || !method || !coin) {
      toast.warning("Please select and enter all required information.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cid", coin);
      formData.append("amount", amount);
      formData.append("payimg", frontImage);
      formData.append("method", method.toString());

      await topUpCoins(formData);
      toast.success("Successful deposit command is pending approval!");
    } catch (error: any) {
      toast.error(
        error.message || "Deposit command failed, please check again!"
      );
    }
  };

  const handleSubmitSell = async () => {
    if (!amount || !method || !coin || !password) {
      toast.warning("Please select and enter all required information.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("cid", coin);
      formData.append("amount", amount);
      formData.append("method", method.toString());
      formData.append("paypassword", password);

      await sellCoins(formData);
      toast.success("Coin withdrawal command created successfully");
    } catch (error: any) {
      toast.error(
        error.message || "withdraw command failed, please check again!"
      );
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#000",
        paddingTop: {
          xs: "10px",
          sm: "80px",
        },
        paddingBottom: {
          xs: "50px",
          sm: "0px",
        },
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
          },
          display: {
            xs: "block",
            sm: "flex",
          },
          justifyContent: "center",
          margin: "0 auto",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "35%" },
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "35px",
              },
              fontWeight: "600",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Buy crypto in a few steps
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "20px",
                sm: "20px",
              },
              fontWeight: "500",
              color: "#909090",
              textAlign: "center",
            }}
          >
            Bitcoin, Ethereum, Tether, Solana, and more popular crypto
          </Typography>
        </Box>
        {user ? (
          <Box
            sx={{
              width: { xs: "100%", sm: "55%" },
              border: {
                xs: "none",
                sm: "1px solid rgba(203, 203, 203, 0.46)",
              },

              boxShadow: {
                xs: "none",
                sm: "0px 0px 30px rgba(255, 255, 255, 0.42)",
              },
              padding: {
                xs: "0px",
                sm: "10px",
              },
              backgroundColor: "#000",
              borderRadius: "10px",
            }}
          >
            <Box sx={{ borderBottom: 1 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "80%",
                  },
                  padding: "0px 10px",
                  "& .MuiTab-root": {
                    color: "#909090",
                    fontSize: "18px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    "&:hover": { color: "#fff" },
                    "&.Mui-selected": {
                      color: "#fff",
                      fontWeight: 700,
                      borderBottom: "2px solid #fff",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#000",
                  },
                }}
              >
                <Tab label="Deposit" {...a11yProps(0)} />
                <Tab label="Withdraw" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: { xs: "100%", sm: "45%" } }}>
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      padding: {
                        xs: "0px 0px",
                        sm: "20px 0px",
                      },
                    }}
                    options={wallet}
                    autoHighlight
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      setCoin(newValue?.id?.toString() || "2");
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
                        variant="outlined"
                        InputLabelProps={{ style: { color: "white" } }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },

                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            ...params.inputProps,
                            autoComplete: "new-password",
                          },
                        }}
                      />
                    )}
                  />
                  {bank > 0 ? (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthod}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
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
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {option.name}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Method"
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthodWallet}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
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
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {option.name}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Method"
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  )}
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      marginTop: "20px",
                      marginBottom: "10px",
                      textAlign: "left",
                    }}
                  >
                    Upload transaction images
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="file"
                    ref={frontFileInput}
                    onChange={handleFrontChange}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="button"
                      sx={{
                        background: "#fff",
                        color: "black",
                        width: "80%",
                        height: "45px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      Deposit
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { xs: "100%", sm: "50%" },
                    boxShadow: {
                      xs: "0px 0px 30px rgba(255, 255, 255, 0.31)",
                      sm: "0px 0px 30px rgba(255, 255, 255, 0.24)",
                    },
                    padding: {
                      xs: "10px",
                      sm: "15px",
                    },
                    marginTop: {
                      xs: "20px",
                      sm: "0px",
                    },

                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: {
                        xs: "18px",
                        sm: "25px",
                      },
                      fontWeight: "bold",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    Top-up information
                  </Typography>

                  {method === 1 && (
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          marginTop: "10px",
                        }}
                      >
                        Bank name: {configs.bank_name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          marginTop: "10px",
                        }}
                      >
                        Bank account number: {configs.bank_acc_no}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          marginTop: "10px",
                        }}
                      >
                        Bank account name: {configs.bank_acc_name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          marginTop: "10px",
                        }}
                      >
                        Amount to be paid:{" "}
                        {formatCurrency(bank * Number(amount))}{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        Note: After completing the payment, please take a
                        screenshot and confirm that the payment has been made.
                      </Typography>
                    </Box>
                  )}
                  {method === 2 && (
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Transfer coins to the wallet
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Wallet address: {address}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "white",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Type of coin:{" "}
                        {coin === "1" ? (
                          <>
                            <img
                              loading="lazy"
                              width="30"
                              src="/images/4f8f27a4de61fca0faca95298f6714c81fcfc22929d68e1062e396c4026452f9_200.webp"
                              alt=""
                            />{" "}
                            PI Nework
                          </>
                        ) : (
                          <>
                            <img
                              loading="lazy"
                              width="30"
                              srcSet={`/images/usdt.png`}
                              src="/images/usdt.png"
                              alt=""
                            />{" "}
                            USDT
                          </>
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        The number of coins to transfer: {amount}
                      </Typography>
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: {
                            xs: "14px",
                            sm: "16px",
                          },
                          marginTop: "10px",
                        }}
                      >
                        Note: After payment through the wallet, please take a
                        picture of the confirmation receipt.
                      </Typography>
                    </Box>
                  )}
                  {method === 0 && (
                    <Box>
                      <img
                        src="/images/credit-card.png"
                        height={80}
                        style={{ margin: "30px 0" }}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {user && user.wdstatus === 1 ? (
                <Box
                  sx={{ width: { xs: "100%", sm: "80%" }, margin: "0 auto" }}
                >
                  <Autocomplete
                    id="country-select-demo"
                    sx={{
                      padding: {
                        xs: "0px 0px",
                        sm: "20px 0px",
                      },
                    }}
                    options={wallet}
                    autoHighlight
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      setCoin(newValue?.id?.toString() || "2");
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
                        variant="outlined"
                        InputLabelProps={{ style: { color: "white" } }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: "white",
                            "& fieldset": {
                              borderColor: "white",
                            },
                            "&:hover fieldset": {
                              borderColor: "white",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "white",
                            },
                          },

                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                        }}
                        slotProps={{
                          htmlInput: {
                            ...params.inputProps,
                            autoComplete: "new-password",
                          },
                        }}
                      />
                    )}
                  />
                  {bank > 0 ? (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthod}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
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
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {option.name}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Method"
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Autocomplete
                      id="country-select-demo"
                      sx={{ padding: "20px 0px" }}
                      options={medthodWallet}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      onChange={(event, newValue) => {
                        setMethod(newValue?.id || 2);
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
                            {option.id === 1 ? (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/bank.png`}
                                src="/images/bank.png"
                                alt=""
                              />
                            ) : (
                              <img
                                loading="lazy"
                                width="20"
                                srcSet={`/images/wallet.png`}
                                src="/images/wallet.png"
                                alt=""
                              />
                            )}
                            {option.name}
                          </Box>
                        );
                      }}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          label="Method"
                          variant="outlined"
                          InputLabelProps={{ style: { color: "white" } }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              color: "white",
                              "& fieldset": {
                                borderColor: "white",
                              },
                              "&:hover fieldset": {
                                borderColor: "white",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "white",
                              },
                            },

                            "& .MuiInputLabel-root": {
                              color: "white",
                            },
                          }}
                          slotProps={{
                            htmlInput: {
                              ...params.inputProps,
                              autoComplete: "new-password",
                            },
                          }}
                        />
                      )}
                    />
                  )}
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Payment Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                      },
                      marginTop: "20px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                        },
                        "&:hover fieldset": {
                          borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            sx={{ color: "white" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="button"
                      sx={{
                        background: "#fff",
                        color: "black",
                        width: "80%",
                        height: "45px",
                        borderRadius: "15px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        "&:hover": {
                          background: "#fff",
                        },
                      }}
                      onClick={handleSubmitSell}
                    >
                      Withdraw
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{ width: "100%", margin: "auto", textAlign: "center" }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "30px",
                      textAlign: "center",
                    }}
                  >
                    You have not created a payment password.
                  </Typography>
                  <Button
                    type="button"
                    href="/security"
                    sx={{
                      background: "#fff",
                      color: "black",
                      width: "250px",
                      height: "45px",
                      borderRadius: "15px",
                      marginTop: "20px",
                      fontWeight: 600,
                      "&:hover": {
                        background: "#fff",
                      },
                    }}
                  >
                    Add Password Payment
                  </Button>
                </Box>
              )}
            </CustomTabPanel>
          </Box>
        ) : (
          <Box
            sx={{
              width: {
                xs: "90%",
                sm: "55%",
              },
              textAlign: "center",
              boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.24)",
              borderRadius: "15px",
              height: "400px",
              margin: "0 auto",
              display: "grid",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                You are not logged in
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "20px", fontWeight: 600 }}
              >
                Please log in to deposit / withdraw coins.
              </Typography>
              <Button
                type="button"
                href="/login"
                sx={{
                  background: "#fff",
                  color: "black",
                  width: "250px",
                  height: "45px",
                  borderRadius: "15px",
                  marginTop: "20px",
                  fontWeight: 600,
                  "&:hover": {
                    background: "#fff",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          paddingTop: "10px",
          paddingBottom: "80px",
        }}
      >
        {" "}
        <AssetChartView />
      </Box>
    </Box>
  );
}
