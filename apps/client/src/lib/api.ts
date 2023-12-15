import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import i18next from "i18next";

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
    diff?: number | null;
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

    async getAccounts(userId: string) {
        return (await this.get<IAccount[]>('/instagram', { params: { userId } })).data
    }

    async createAccounts({ userId, token }: { userId: string, token: string }) {
        return (await this.post(`/instagram`, { userId, token })).data
    }

    async getAccountInsights({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await this.get<IAccountInsights[]>(`/instagram/${accountId}/insights`, {
            params: { userId, period }
        })).data
    }

    async getAccountInteractions({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await this.get<IAccountInsights[]>(`/instagram/${accountId}/interactions`, {
            params: { userId, period }
        })).data
    }

    async getAccountOnlineFollowers({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await this.get<IAccountOnlineFollowers>(`/instagram/${accountId}/online-followers`, {
            params: { userId, period }
        })).data
    }

    async getAccountFollowersCount({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await this.get<IAccountFollowersCount>(`/instagram/${accountId}/followers-count`, {
            params: { userId, period }
        })).data
    }
}

export const api = new Api();