"use client";
import React, { cloneElement, useEffect, useState } from "react";
import Image from "next/image";
import usePlayGame from "@/hook/usePlayGame";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { Box, Typography, Button, Pagination } from "@mui/material";
import { getListGame, getListGameFish } from "@/services/GameApi.service";
import { GameSlotsMenu, ListMenu } from "@/datafake/Menu";
import SlotsGameItemPage from "../Slots/SlotsGameItem.page";
import FishGameItemPage from "./FishGameItem.page";

const commonImgStyles = {
  height: {
    xs: "100px",
    sm: "100px",
  },
  position: "absolute",
  transition: "0.2s ease-in-out",
  zIndex: 1,
  top: 0,
  left: 0,
  width: "100%",
  "&:hover": {
    filter: "blur(3px)",
  },
};
const commonTextBoxStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
};
const commonCardStyles = {
  width: {
    xs: "100px",
    sm: "100px",
  },
  height: {
    xs: "100px",
    sm: "100px",
  },
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  transition: "0.2s ease-in-out",
  position: "relative",
  overflow: "hidden",
  "&:hover .MuiButton-root": {
    opacity: 1,
  },
  "&:hover": {
    transform: "scale(1.04) rotate(-1deg)",
  },
};
const buttonStyles = {
  backgroundImage:
    "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",

  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  zIndex: 3,
  pointerEvents: "auto",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
  "&:hover": {
    backgroundImage:
      "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",

    opacity: 1,
    filter: "none",
  },
};

export default function FishPage() {
  const [acctiveMenu, setAcctiveMenu] = useState<string>("1");

  return (
    <Box
      sx={{
        width: {
          xs: "98%",
          sm: "100%",
        },
        margin: "auto",
        paddingTop: 10,
        paddingBottom: {
          xs: 0,
          sm: 2,
        },
      }}
    >
      <Image
        src={"/images/fishing.png"}
        width={1000}
        height={150}
        alt=""
        style={{ width: "100%" }}
        className="banner-games"
      />
      <Box
        sx={{
          width: {
            xs: "98%",
            sm: "80%",
          },
          margin: "auto",
          paddingBottom: {
            xs: 0,
            sm: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: "15px",
            paddingBottom: "20px",
            marginTop: "-40px",
            justifyContent: { xs: "flex-start", sm: "left" },
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {ListMenu.map((item) => (
            <Button
              onClick={() => {}}
              sx={{
                minWidth: "160px",
                maxWidth: "200px",
                flexShrink: 0,
                background:
                  item?.id == "4"
                    ? "#0063ff"
                    : "linear-gradient(180deg, #293259, rgba(35, 43, 79, .7));",
                border: "1px solid #384375",
                color: "white",
                gap: "5px",
                fontSize: { xs: "12px", sm: "14px" },
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                justifyItems: "center",
                "&:hover": {
                  background: "#0063ff",
                },
              }}
              key={item.id}
              href={item.link}
            >
              {cloneElement(
                item.icon,
                item?.id == "4"
                  ? {
                      fill: "#FFFFFF",
                    }
                  : {}
              )}
              {item.title}
            </Button>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: "10px",
            paddingBottom: "20px",
            justifyContent: { xs: "flex-start", sm: "left" },
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          }}
        >
          {GameSlotsMenu.map((item) => (
            <Button
              sx={{
                display: "flex",
                minWidth: "164px",
                maxWidth: "200px",
                flexShrink: 0,
                background:
                  item?.id === acctiveMenu
                    ? "#0063ff"
                    : "linear-gradient(180deg, #293259, rgba(35, 43, 79, .7));",
                border: "1px solid #384375",
                color: "white",
                gap: "5px",
                fontSize: { xs: "12px", sm: "14px" },
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#0063ff",
                },
              }}
              key={item.id}
            >
              {item.icon}
              {item.title}
            </Button>
          ))}
        </Box>
        <FishGameItemPage />
      </Box>
    </Box>
  );
}
