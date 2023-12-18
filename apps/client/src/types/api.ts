import { DateRange } from "react-day-picker";

export interface IInsightsParams {
    accountId: string;
    userId: string;
    period?: DateRange;
}

export interface IAccountParams {
    userId: string;
    token: string;
}