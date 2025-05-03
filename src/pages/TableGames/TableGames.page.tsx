"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import usePlayGame from "@/hook/usePlayGame";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { Box, Typography, Button, Pagination } from "@mui/material";
import { getListGame } from "@/services/GameApi.service";
import SlotsGameItemPage from "../Slots/SlotsGameItem.page";
import { GameSlotsMenu, ListMenu } from "@/datafake/Menu";

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
  padding: "5px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  zIndex: 3,
  pointerEvents: "auto",
  fontSize: "10px",
  opacity: 0,
  transition: "opacity 0.2s ease-in-out",
  "&:hover": {
    backgroundImage:
      "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",

    opacity: 1,
    filter: "none",
  },
};

export default function TableGamesPage() {
  const { loading, playGame } = usePlayGame();
  const [load, setLoad] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [gameTable, setGameTable] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [GameType, setGameType] = useState<string>("RNG");
  const [ProductType, setProductType] = useState<string>("CQ9");
  const itemsPerPage = 30;

  useEffect(() => {
    setLoad(true);
    getListGame("CQ9", "RNG").then((res) => {
      if (res.data) {
        setGameTable(res.data.games);
        setLoad(false);
      }
    });
  }, []);

  // Tính toán item hiển thị
  const totalPages = Math.ceil(gameTable.length / itemsPerPage);
  const displayedGames = gameTable.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setIsPageLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsPageLoading(false);
    }, 1000);
  };

  return (
    <>
      {loading || load || isPageLoading ? (
        <>
          <SimpleBackdrop />
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              height: "1000px",
              marginTop: 10,
              paddingTop: 10,
              paddingBottom: {
                xs: 80,
                sm: 10,
              },
            }}
          ></Box>
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
