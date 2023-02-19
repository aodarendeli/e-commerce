import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translations: {
          "Home": "Ana Sayfa",
        }
      },
      en: {
        translations: {
          "Home": "Home",
        }
      }
    },
    lng: "tr",
    fallbackLng: "tr",
    // debug true olursa console'da dil değişkenleri görüntülenir.
    debug: false,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
