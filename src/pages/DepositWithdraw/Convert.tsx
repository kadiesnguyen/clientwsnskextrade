import { ConvertUSDT, topUpCoins } from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";
import { CopyAllOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export default function Convert() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const submit = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error(t("Toast.convert1"));
      return;
    }
    const formData = new FormData();
    formData.append("amount", amount);
    ConvertUSDT(formData)
      .then((res: any) => {
        if (res.status === true) {
          toast.success(t("Toast.convert2"));
          setAmount("");
        } else {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        toast.error(err?.message || t("Toast.convert3"));
      });
  };
  return (
    <Box
      sx={{
        display: {
          xs: "block",
          sm: "flex",
        },
        flexWrap: "wrap",
        gap: 1,
        alignItems: "flex-start",
      }}
    >
      <TextField
        id="outlined-basic"
        placeholder={t("DepositWithdrawPage.amount_name")}
        variant="outlined"
        onChange={(e) => setAmount(e.target.value)}
        FormHelperTextProps={{
          sx: { color: "#fff" }, // HelperText màu trắng
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            color: "white",
            height: {
              xs: "52px",
              sm: "45px",
            },
            fontSize: "16px",
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
          "& .MuiInputBase-input": {
            width: "100%",
            padding: "0 14px", // chỉnh padding trái phải
            display: "flex",
            alignItems: "center", // quan trọng để căn giữa
            height: "90%", // full chiều cao TextField
            boxSizing: "border-box",
          },
          "& .MuiInputBase-input::placeholder": {
            color: "white",
            fontSize: "16px",
            opacity: 1, // để không bị mờ
          },
        }}
      />
      <Button
        type="button"
        sx={{
          width: "100%",
          height: "40px",
          background: "#fcd534",
          color: "black",
          borderRadius: "10px",
          fontSize: "14px",
          mt: "15px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#fcd534",
          },
        }}
        onClick={submit}
      >
        {t("DepositWithdrawPage.convert")}
      </Button>
    </Box>
  );
}
