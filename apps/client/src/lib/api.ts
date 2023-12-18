import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import i18next from "i18next";
import { convertPeriod } from "./date";
import { IAccount, IAccountFollowersCount, IAccountInteractions, IAccountOnlineFollowers, IAccountOverview } from '@repo/types';
import { IAccountParams, IInsightsParams } from "@/types/api";

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

    async createAccounts({ userId, token }: IAccountParams) {
        return (await this.post(`/instagram`, { userId, token })).data
    }

    async getAccountInsightsOverview(params: IInsightsParams) {
        return this.getAccountInsights<IAccountOverview[]>('overview', params);
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
