import { format } from "date-fns";
import { enUS, ru } from 'date-fns/locale';
import i18next from "i18next";
import { DateRange } from "react-day-picker";


const locales: Record<string, Locale> = {
    en: enUS,
    ru
};

export const formatDate = (value: Date, formatString: string) => {
    const locale = locales[i18next.language];
    return format(value, formatString, { locale });
}


export const convertPeriod = (period: DateRange = {
    from: undefined,
    to: undefined,
}) => {
    return {
        since: period.from && Math.floor(period.from.getTime() / 1000),
        until: period.to && Math.floor(period.to.getTime() / 1000),
    };
}