"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
interface LanguageSwitcherProps {
  onLanguageChange?: (lang: string) => void;
}
const LanguageSwitcher = ({ onLanguageChange }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Lưu vào localStorage (nếu cần lưu trạng thái)
    localStorage.setItem("lang", lang);
    if (onLanguageChange) {
      onLanguageChange(lang); // Notify parent
    }
  };

  return (
    <ul
      style={{
        padding: "10px",
      }}
    >
      <li
        style={{
          width: "160px",
          cursor: "pointer",
          padding: "5px 0",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          color: "white",
        }}
        onClick={() => changeLanguage("en")}
        value="en"
      >
        <Image
          src={"https://flagcdn.com/us.svg"}
          width={30}
          height={30}
          style={{ height: "20px", objectFit: "contain" }}
          alt="us"
        />
        English
      </li>
      <li
        style={{
          width: "160px",
          cursor: "pointer",
          padding: "5px 0",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          color: "white",
        }}
        onClick={() => changeLanguage("vi")}
      >
        <Image
          src={"https://flagcdn.com/vn.svg"}
          width={30}
          height={30}
          style={{ height: "20px", objectFit: "contain" }}
          alt="vn"
        />
        Việt Nam
      </li>
      <li
        style={{
          width: "160px",
          cursor: "pointer",
          padding: "5px 0",
          display: "flex",
          gap: "5px",
          alignItems: "center",
          color: "white",
        }}
        onClick={() => changeLanguage("ja")}
      >
        <Image
          src={"https://flagcdn.com/jp.svg"}
          width={30}
          height={30}
          style={{ height: "20px", objectFit: "contain" }}
          alt="japan"
        />
        日本語
      </li>
    </ul>
  );
};

export default LanguageSwitcher;
