"use client";
import { useEffect } from "react";
import "./Translate.module.css";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}
type TranslateGoogleProps = {
  onLanguageChange?: (langCode: string) => void;
};

const TranslateGoogle: React.FC<TranslateGoogleProps> = ({
  onLanguageChange,
}) => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        // Nội dung gốc là tiếng Việt (i18n default lng=vi).
        // Nếu để "en", GT sẽ dịch lại chữ Việt như tiếng Anh → cắt/méo chữ (vd. mất "Nạp").
        pageLanguage: "vi",
        includedLanguages: "en,vi,zh-CN",
        autoDisplay: false,
      },
      "google_translate_element"
    );

    // Sau khi DOM load, xử lý select ẩn
    window.setTimeout(() => {
      const select = document.querySelector(
        "#google_translate_element select"
      ) as HTMLSelectElement;

      if (select) {
        // Tuỳ chỉnh label các option
        Array.from(select.options).forEach((option) => {
          switch (option.value) {
            case "vi":
              option.text = "Việt Nam";
              break;
            case "en":
              option.text = "English";
              break;
            case "zh-CN":
              option.text = "简体中文";
              break;
            default:
              break;
          }
          option.classList.add("notranslate");
          option.setAttribute("translate", "no");
        });

        // Gắn sự kiện lưu ngôn ngữ
        select.addEventListener("change", (e: Event) => {
          const target = e.target as HTMLSelectElement;
          const selectedLang = target.value;
          localStorage.setItem("language", selectedLang);
          onLanguageChange?.(selectedLang);
        });

        // Apply lại ngôn ngữ nếu đã lưu (bỏ qua "vi" = ngôn ngữ gốc, tránh GT dịch lại)
        const savedLang = localStorage.getItem("language");
        if (savedLang && savedLang !== "vi") {
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));
        } else {
          // Xóa cookie googtrans để hết bản dịch méo từ lần trước
          document.cookie =
            "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
          document.cookie =
            "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=" +
            window.location.hostname;
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const handleLanguageClick = (langCode: string) => {
    const select = document.querySelector(
      "#google_translate_element select"
    ) as HTMLSelectElement;

    if (select) {
      select.value = langCode;

      // Tạo sự kiện change chuẩn
      const event = new Event("change", {
        bubbles: true,
        cancelable: true,
      });

      select.dispatchEvent(event);
      localStorage.setItem("language", langCode);
      onLanguageChange?.(langCode);

      // Kích hoạt Google Translate chính xác
      const frame = document.querySelector(
        "iframe.goog-te-menu-frame"
      ) as HTMLIFrameElement;
      if (frame) {
        try {
          const innerDoc =
            frame.contentDocument || frame.contentWindow?.document;
          const langLinks = innerDoc?.querySelectorAll(
            ".goog-te-menu2-item span.text"
          );
          langLinks?.forEach((el) => {
            if (
              (el as HTMLElement).innerText
                .toLowerCase()
                .includes(langCode.toLowerCase())
            ) {
              (el as HTMLElement).click();
            }
          });
        } catch (err) {
          console.warn("Cannot access Google Translate iframe yet");
        }
      }
    }
  };

  return (
    <div>
      {/* Ẩn select mặc định */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Menu tuỳ chọn ngôn ngữ */}
      <ul className="menu-lang" style={{}}>
        <li onClick={() => handleLanguageClick("vi")}>Việt Nam</li>
        <li onClick={() => handleLanguageClick("en")}>English</li>
        <li onClick={() => handleLanguageClick("zh-CN")}>简体中文</li>
      </ul>
    </div>
  );
};

export default TranslateGoogle;
