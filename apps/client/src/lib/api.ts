import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import i18next from "i18next";
import { convertPeriod } from "./date";
import { DateRange } from "react-day-picker";

interface IAccount {
    id: string;
    name: string;
    username: string;
    pictureUrl: string;
    posts: string | number,
    follows: string | number,
    followers: string | number,
    provider: 'instagram';
}

export interface IAccountInsights {
    id: string;
    name: TInsightName;
    description: string;
    title: string;
    totalValue: number;
    diff: number | null;
}


export interface IAccountInteractions {
    id: string;
    name: string;
    description: string;
    title: string;
    totalValue: {
        value: number;
        breakdowns: {
            results?: {
                value: number;
                dimension_values: 'POST' | 'REELS' | 'AD' | 'STORY'[]
            }[]
        }[];
    };
}

type TInsightName =
| 'reach'
| 'impressions'
| 'accounts_engaged'
| 'profile_views';


export type THour = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23';

export interface IAccountOnlineFollowers {
    id: string;
    name: TInsightName;
    description: string;
    title: string;
    values: {
        value: Record<THour, number>;
        end_time: string;
    }[]
}

export interface IAccountFollowersCount {
    id: string;
    name: TInsightName;
    description: string;
    title: string;
    values: {
        value: Record<THour, number>;
        end_time: string;
    }[]
}

interface IInsightsParams {
    accountId: string;
    userId: string;
    period?: DateRange;
}

class Api {
    get headers() {
        return {
            'Accept-Language': i18next.language
        }
    }

    private get<T = unknown, R = AxiosResponse<T>>(url: string, config: AxiosRequestConfig = {}): Promise<R> {
        return axios.get(url, {
            ...config,
            withCredentials: true,
            baseURL: "/api",
            headers: {
                ...config.headers,
                ...this.headers
            }
        });
    }

    private post<T = unknown, R = AxiosResponse<T>, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
        return axios.post(url, data, {
            ...config,
            withCredentials: true,
            baseURL: "/api",
            headers: {
                ...config?.headers,
                ...this.headers
            }
        });
    }

    private async getAccountInsights<T>(slug: string, params: IInsightsParams) {
        const { accountId, userId, period } = params;
        console.log('>>>>', {slug, period});


        const result = await this.get<T>(`/instagram/${accountId}/${slug}`, {
            params: {
                userId,
                period: convertPeriod(period)
            }
        });

        return result.data;
    }

    async getAccounts(userId: string) {
        return (await this.get<IAccount[]>('/instagram', { params: { userId } })).data
    }

    async createAccounts({ userId, token }: { userId: string, token: string }) {
        return (await this.post(`/instagram`, { userId, token })).data
    }

    async getAccountInsightsOverview(params: IInsightsParams) {
        return this.getAccountInsights<IAccountInsights[]>('overview', params);
    }

    async getAccountInteractions(params: IInsightsParams) {
        return this.getAccountInsights<IAccountInteractions[]>('interactions', params);
    }

    async getAccountOnlineFollowers(params: IInsightsParams) {
        return this.getAccountInsights<IAccountOnlineFollowers>('online-followers', params);
    }

    async getAccountFollowersCount(params: IInsightsParams) {
        return this.getAccountInsights<IAccountFollowersCount>('followers-count', params);
    }
}

export const api = new Api();
