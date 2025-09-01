import { useEffect, useRef, useState } from "react";
type MarketDataWidgetProps = {
  width?: number;
  height?: number;
  theme?: "light" | "dark";
};

const MarketDataWidget2 = (progs: MarketDataWidgetProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>("en");

  // Get language from localStorage on first mount
  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Xóa widget cũ trước khi render mới
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: progs.width || "100%",
      height: progs.height,
      symbolsGroups: [
        {
          name: "Indices",
          originalName: "Indices",
          symbols: [
            { displayName: "", name: "OKX:BTCUSDT" },
            { displayName: "", name: "OKX:ETHUSDT" },
            { displayName: "", name: "OKX:PIUSDT" },
            { displayName: "", name: "OKX:SOLUSDT" },
            { displayName: "", name: "OKX:DOGEUSDT" },
            { displayName: "", name: "OKX:OKBUSDT" },
            { displayName: "", name: "OKX:SPKUSDT.P" },
            { displayName: "", name: "OKX:PEPEUSDT" },
            { displayName: "", name: "OKX:IPUSDT" },
            { displayName: "", name: "OKX:TRUMPUSDT" },
            { displayName: "", name: "OKX:XRPUSDT" },
            { displayName: "", name: "OKX:RESOLVUSDT" },
            { displayName: "", name: "OKX:TUSDT" },
            { displayName: "", name: "OKX:XUSDT" },
            { displayName: "", name: "OKX:MAGICUSDT" },
            { displayName: "", name: "OKX:HUMAUSDT" },
            { displayName: "", name: "OKX:BCHUSDT" },
            { displayName: "", name: "OKX:SUIUSDT" },
            { displayName: "", name: "OKX:UNIUSDT" },
            { displayName: "", name: "OKX:PNUTUSDT" },
            { displayName: "", name: "OKX:RAYUSDT" },
            { displayName: "", name: "OKX:SNTUSDT" },
            { displayName: "", name: "OKX:MOODENGUSDT" },
            { displayName: "", name: "OKX:ADAUSDT" },
            { displayName: "", name: "OKX:WCTUSDT" },
            { displayName: "", name: "OKX:TONUSDT" },
            { displayName: "", name: "OKX:AERGOUSDT" },
            { displayName: "", name: "OKX:AAVEUSDT" },
            { displayName: "", name: "OKX:FILUSDT" },
          ],
        },
        {
          name: "Forex",
          originalName: "Forex",
          symbols: [
            { name: "FX:EURUSD", displayName: "EUR to USD" },
            { name: "FX:GBPUSD", displayName: "GBP to USD" },
            { name: "FX:USDJPY", displayName: "USD to JPY" },
            { name: "FX:USDCHF", displayName: "USD to CHF" },
            { name: "FX:AUDUSD", displayName: "AUD to USD" },
            { name: "FX:USDCAD", displayName: "USD to CAD" },
          ],
        },
        {
          name: "Futures",
          originalName: "Futures",
          symbols: [
            { name: "BMFBOVESPA:ISP1!", displayName: "S&P 500 Index Futures" },
            { name: "BMFBOVESPA:EUR1!", displayName: "Euro Futures" },
            { name: "PYTH:WTI3!", displayName: "WTI CRUDE OIL" },
            { name: "BMFBOVESPA:ETH1!", displayName: "Hydrous ethanol" },
            { name: "BMFBOVESPA:CCM1!", displayName: "Corn" },
          ],
        },
        {
          name: "Bonds",
          originalName: "Bonds",
          symbols: [
            { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
            { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
            { name: "EUREX:FGBM1!", displayName: "Euro BOBL" },
          ],
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: "dark",
      locale: `"${language}"`,
      backgroundColor: "#131722",
    });

    container.appendChild(script);

    return () => {
      container.innerHTML = ""; // Cleanup on unmount
    };
  }, [progs.width, progs.height, language]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default MarketDataWidget2;
