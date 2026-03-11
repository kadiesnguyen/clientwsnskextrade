"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect } from "react";

declare global {
  interface Window {
    LiveChatWidget: any;
  }
}

export default function LiveChatPage() {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    // khi vào page -> mở chat
    const timer = setInterval(() => {
      if (window.LiveChatWidget) {
        window.LiveChatWidget.call("maximize");
        clearInterval(timer);
      }
    }, 300);

    return () => {
      // khi rời page -> ẩn chat
      window.LiveChatWidget?.call("hide");
    };
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "448px",
        margin: "auto",
        minHeight: "100vh",
        background: "#111827",
        pb: "130px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        mb={3}
        gap="10px"
        justifyContent="space-between"
        p={2}
      >
        <IconButton
          onClick={() => {
            window.LiveChatWidget?.call("hide");
            router.back();
          }}
          sx={{ background: "#232932" }}
        >
          <ArrowBackIosNewIcon
            sx={{ cursor: "pointer", color: "white", fontSize: "14px" }}
          />
        </IconButton>

        <Typography fontSize={20} fontWeight={600} color="white">
          {t("MenuMobile.title6")}
        </Typography>

        <IconButton />
      </Box>

      <Script id="livechat-script" strategy="afterInteractive">
        {`
          window.__lc = window.__lc || {};
          window.__lc.license = 19579656;
          window.__lc.integration_name = "manual_onboarding";
          window.__lc.product_name = "livechat";

          (function(n,t,c){
            function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
            var e={_q:[],_h:null,_v:"2.0",
            on:function(){i(["on",c.call(arguments)])},
            once:function(){i(["once",c.call(arguments)])},
            off:function(){i(["off",c.call(arguments)])},
            call:function(){i(["call",c.call(arguments)])},
            init:function(){
              var n=t.createElement("script");
              n.async=true;
              n.type="text/javascript";
              n.src="https://cdn.livechatinc.com/tracking.js";
              t.head.appendChild(n)
            }};
            !n.__lc.asyncInit&&e.init(),
            n.LiveChatWidget=n.LiveChatWidget||e
          })(window,document,[].slice);
        `}
      </Script>

      <Box
        sx={{
          height: "100vh",
          background: "#111827",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        LiveChat Loaded
      </Box>
    </Box>
  );
}
