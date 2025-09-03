import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LoyaltyOutlinedIcon from "@mui/icons-material/LoyaltyOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import Logout from "@mui/icons-material/Logout";
import FolderIcon from "@mui/icons-material/Folder";
import CloseIcon from "@mui/icons-material/Close";
import { userResponse } from "@/interface/user.interface";
import { Badge, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import Image from "next/image";
import { CoinIcon } from "@/shared/Svgs/Svg.component";
import { toast } from "react-toastify";
import { buySubscribe } from "@/services/User.service";
import { useTranslation } from "react-i18next";

export interface props {
  type: any | null;
}

export default function Safedetail(type: props) {
  const { t } = useTranslation();
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [amount, setAmount] = React.useState<string | null>(null);
  const open1 = Boolean(anchorEl1);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = async () => {
    if (!amount) {
      console.log("Submit Clicked1");
      toast.error(t("Toast.staking1"));
      return;
    }
  };

  const drawerList = () => {
    return (
      <Box
        sx={{
          width: "100vw",
          background: "#000",
          color: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "#000",
            color: "#fff",
          }}
        >
          {/* <Typography sx={{ textAlign: "center" }}>Staking</Typography> */}
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              background: "#909090",
              borderRadius: "50%",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: "24px" }} />
          </IconButton>
        </Box>
        <TextField
          value={amount}
          onChange={(e: any) => {
            setAmount(e.target.value);
          }}
          sx={{
            width: "90%",
            margin: "16px auto",
            background: "#909090",
            borderRadius: "10px",
            color: "white",
            border: "none",

            "& .MuiOutlinedInput-root": {
              color: "white",
              "&.Mui-focused fieldset": {
                // borderColor: "white",
                border: "none",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              fontSize: { xs: "12px", sm: "14px" },
              opacity: 1, // để không bị mờ
            },
          }}
          placeholder={t("StakingPage.amount")}
          variant="outlined"
          InputProps={{
            startAdornment: <IconButton>{<CoinIcon />}</IconButton>,
          }}
        />
        <Button
          type="button"
          sx={{
            background: "#fcd534",
            color: "black",
            width: "90%",
            margin: "16px auto",
            height: "45px",
            borderRadius: "15px",
            fontSize: { xs: "13px", sm: "14px" },
            textTransform: "capitalize",
            fontWeight: "bold",
            "&:hover": {
              background: "#fcd534",
            },
          }}
          onClick={handleSubmit}
        >
          {t("MiningPage.button")}
        </Button>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Box>
        <Button
          type="button"
          sx={{
            width: "100%",
            height: "40px",
            background: "#fcd534",
            color: "black",
            borderRadius: "10px",
            fontSize: "14px",
            mt: "5px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#fcd534",
            },
          }}
          onClick={handleClick}
        >
          {t("MiningPage.button")}
        </Button>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        sx={{
          zIndex: 9999999,
          "& .MuiDrawer-paper": {
            background: "#1a263f",
            border: "none",
            borderRadius: "0",
          },
        }}
      >
        {drawerList()}
      </Drawer>
    </React.Fragment>
  );
}
