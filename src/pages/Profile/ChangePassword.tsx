"use client";
import { useState } from "react";
import { Box, TextField, Button, Typography, Tabs, Tab } from "@mui/material";
import { updatePassword, updatePaymentPassword } from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";

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
export default function ChangePassword() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [newPaymentPassword, setNewPaymentPassword] = useState("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] = useState("");
  const [value, setValue] = useState(0);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (currentPassword && newPassword && confirmPassword) {
      await updatePassword(currentPassword, newPassword, confirmPassword)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass1"));
          } else {
            toast.error(t("Toast.change_pass2"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleSubmitPayment = async (e: any) => {
    e.preventDefault();
    if (newPaymentPassword !== confirmPaymentPassword) {
      toast.warning(t("Toast.change_pass4"));
      return;
    }
    if (oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("current_paypassword", oldPassword);
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass4"));
          } else {
            toast.error(t("Toast.change_pass5"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    if (!oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass6"));
          } else {
            toast.error(t("Toast.change_pass7"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
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
          <Tab label={t("ProfilePage.tab_pass1")} {...a11yProps(0)} />
          <Tab label={t("ProfilePage.tab_pass2")} {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              textAlign: {
                xs: "Center",
                sm: "left",
              },
              mt: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              {t("ProfilePage.title_change")}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * {t("ProfilePage.change_note")}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t("ProfilePage.change_label1")}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text1")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label={t("ProfilePage.change_label2")}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text2")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label3")}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text3")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "black",
                  width: "250px",
                  height: "50px",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
              >
                {t("ProfilePage.button_change")}
              </Button>
            </form>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              textAlign: {
                xs: "Center",
                sm: "left",
              },
              mt: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              {t("ProfilePage.change_pay_title")}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * {t("ProfilePage.change_pay_note")}
            </Typography>
            <form onSubmit={handleSubmitPayment}>
              {user && user.wdstatus === 1 && (
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label1")}
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text1")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
              )}
              <TextField
                fullWidth
                label={t("ProfilePage.change_label2")}
                type="password"
                value={newPaymentPassword}
                onChange={(e) => setNewPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text2")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label3")}
                type="password"
                value={confirmPaymentPassword}
                onChange={(e) => setConfirmPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text3")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "black",
                  width: "250px",
                  height: "50px",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
              >
                {t("ProfilePage.button_change")}
              </Button>
            </form>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
