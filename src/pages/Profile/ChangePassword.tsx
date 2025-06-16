"use client";
import { useState } from "react";
import { Box, TextField, Button, Typography, Tabs, Tab } from "@mui/material";
import { updatePassword, updatePaymentPassword } from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";

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
            toast.success("Password changed successfully!");
          } else {
            toast.error("Failed to change password. Please try again.");
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
      alert("New passwords do not match!");
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
            toast.success("Password payment changed successfully!");
          } else {
            toast.error("Failed to change password. Please try again.");
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
            toast.success("Password payment changed successfully!");
          } else {
            toast.error("Failed to change password. Please try again.");
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
          <Tab label="Change login password" {...a11yProps(0)} />
          <Tab label="Change payment password" {...a11yProps(1)} />
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
              Change login password
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * Please ensure that the new password is strong enough and
              different from the old password.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="normal"
                required
                helperText="Please enter the old password"
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
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
                helperText="Please enter a new password"
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
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                helperText="Please confirm the new password"
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
                }}
              >
                Change Password
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
              Change payment password
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * Please ensure that the new password is strong enough and
              different from the old password.
            </Typography>
            <form onSubmit={handleSubmitPayment}>
              {user && user.wdstatus === 1 && (
                <TextField
                  fullWidth
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  margin="normal"
                  required
                  helperText="Please enter the old password"
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
                label="New Password"
                type="password"
                value={newPaymentPassword}
                onChange={(e) => setNewPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText="Please enter a new password"
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
                label="Confirm New Password"
                type="password"
                value={confirmPaymentPassword}
                onChange={(e) => setConfirmPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText="Please confirm the new password"
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
                }}
              >
                Change Password
              </Button>
            </form>
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
