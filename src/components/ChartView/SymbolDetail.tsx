import React, { useEffect, useRef } from "react";

interface TradingViewSymbolInfoProps {
  symbol: string;
}

const TradingViewSymbolInfo: React.FC<TradingViewSymbolInfoProps> = ({
  symbol,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      height: "300",
      locale: "en",
      colorTheme: "dark",
      fontSize: "12",
      isTransparent: false,
    });

    ref.current.appendChild(script);
  }, [symbol]);

  return <div className="tradingview-widget-container" ref={ref}></div>;
};

export default TradingViewSymbolInfo;
