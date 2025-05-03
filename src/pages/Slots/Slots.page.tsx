"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import usePlayGame from "@/hook/usePlayGame";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import {
  Box,
  Typography,
  Button,
  Pagination,
  Tooltip,
  IconButton,
} from "@mui/material";
import { getListGame } from "@/services/GameApi.service";
import { GameSlotsMenu, ListMenu } from "@/datafake/Menu";
import SlotsGameItemPage from "./SlotsGameItem.page";

export default function SlotsPage() {
  const { loading, playGame } = usePlayGame();
  const [load, setLoad] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [GameType, setGameType] = useState<string>("RNG");
  const [ProductType, setProductType] = useState<string>("JL");

  return (
    <>
      {loading || load || isPageLoading ? (
        <>
          <SimpleBackdrop />
        </>
      ) : (
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
            src={"/images/tables.webp"}
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
                      "linear-gradient(180deg, #293259, rgba(35, 43, 79, .7));",
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
                      background:
                        "linear-gradient(180deg,rgb(51, 61, 109), rgba(52, 63, 113, 0.7));",
                    },
                  }}
                  key={item.id}
                >
                  {item.icon}
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
                  onClick={() => {
                    setGameType(item.gameType);
                    setProductType(item.productType);
                  }}
                  sx={{
                    display: "flex",
                    minWidth: "164px",
                    maxWidth: "200px",
                    flexShrink: 0,
                    background:
                      "linear-gradient(180deg, #293259, rgba(35, 43, 79, .7));",
                    border: "1px solid #384375",
                    color: "white",
                    gap: "5px",
                    fontSize: { xs: "12px", sm: "14px" },
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      background:
                        "linear-gradient(180deg,rgb(51, 61, 109), rgba(52, 63, 113, 0.7));",
                    },
                  }}
                  key={item.id}
                >
                  {item.icon}
                  {item.title}
                </Button>
              ))}
            </Box>
            <SlotsGameItemPage GameType={GameType} ProductType={ProductType} />
          </Box>
        </Box>
      )}
    </>
  );
}
