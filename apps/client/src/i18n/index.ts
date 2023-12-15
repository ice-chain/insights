import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import { en } from "./en";
import { ru } from "./ru";

const resources = {
  'en': en,
  'ru': ru,
};

export const supportedLngs = Object.keys(resources);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
  });

  export default i18n;