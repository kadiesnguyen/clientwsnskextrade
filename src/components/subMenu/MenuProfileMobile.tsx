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
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatMoney";
import Image from "next/image";
import {
  BankMenuIcon,
  DashboardIcon,
  GiftMenuIcon,
  HistoryBetMenuIcon,
  HistoryMenuIcon,
  LiveChatMenuIcon,
  LogoutMenuIcon,
  NapMenuIcon,
  P2PMenuIcon,
  ProfileIcon,
  RutMenuIcon,
} from "@/shared/Svgs/Svg.component";
import NavigationGame from "@/hook/NavigationGame";

export interface userProps {
  user: userResponse | null;
}

export default function MenuProfileMobile(data: userProps) {
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const open1 = Boolean(anchorEl1);
  const route = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleMenuItemClick = (onClick: () => void) => {
    onClick();
    handleDrawerClose();
  };

  const menuItems = [
    {
      text: "Quản lý tài khoản",
      icon: <ProfileIcon />,
      onClick: () => route.push("/profile"),
    },
    {
      text: "Quản lý ngân hàng",
      icon: <BankMenuIcon />,
      onClick: () => route.push("/profile"),
    },
    {
      text: "Tiền thưởng",
      icon: <GiftMenuIcon />,
      onClick: () => route.push("/promotion"),
    },
    {
      text: "Lịch sử giao dịch",
      icon: <HistoryMenuIcon />,
      onClick: () => route.push("/profile/transaction-history"),
    },
    {
      text: "Lịch sử cược cục",
      icon: <HistoryBetMenuIcon />,
      onClick: () => route.push("/profile/betting-history"),
    },
    {
      text: "Live chat 24/7",
      icon: <LiveChatMenuIcon />,
      onClick: () => NavigationGame("https://t.me/HitJuwa"),
    },
  ];

  const drawerList = () => (
    <Box
      sx={{
        width: "100vw",
        background: "#fff",
        color: "black",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          background: "#fff",
          color: "black",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Avatar src="/images/avatar-4.webp" sx={{ width: 40, height: 40 }} />
          <Box>
            <Typography
              sx={{ fontSize: "16px", fontWeight: "bold", color: "black" }}
            >
              {data.user?.username || "huyn19e6bffa5"}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleDrawerClose}
          sx={{
            color: "white",
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "24px" }} />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              padding: "0 4.2666666667vw 4.2666666667vw",
            }}
          >
            <ListItemButton
              onClick={() => handleMenuItemClick(item.onClick)}
              sx={{
                padding: "10px",
                height: "12.8vw",
                borderRadius: "10px",
                "&:hover": {
                  background: "lightgray",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "3.7333333333vw !important",
                  lineHeight: "5.3333333333vw !important",
                  fontFamily: "Lexend, sans-serif !important",
                  fontWeight: "400 !important",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Sign Out Button */}
      <Box sx={{ padding: "16px" }}>
        <Button
          onClick={() =>
            handleMenuItemClick(() => {
              window.localStorage.removeItem("tokenokx");
              window.location.href = "/";
            })
          }
          sx={{
            width: "100%",
            background: "transparent",
            color: "black",
            border: "1px solid #2f3b56",
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "14px",
            padding: "8px 0",
            "&:hover": {
              background: "#2f3b56",
            },
          }}
        >
          <LogoutMenuIcon />
          ĐĂNG XUẤT
        </Button>
      </Box>
    </Box>
  );

  return (
    <React.Fragment>
      <Box
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          gap: "8px",
          height: "50px",
          lineHeight: "50px",
          padding: "8px 8px",
          background: "#fff",
          border: "none",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={drawerOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={drawerOpen ? "true" : undefined}
          >
            <DashboardIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Drawer
        anchor="left"
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
