import { format } from "date-fns";
import { enUS, ru } from 'date-fns/locale';
import i18next from "i18next";


const locales: Record<string, Locale> = {
    en: enUS,
    ru
};

export const formatDate = (value: Date, formatString: string) => {
    const locale = locales[i18next.language];
    return format(value, formatString, { locale });
}
