import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: "/api",
});

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

interface IAccountInsights {
    id: string;
    name: TInsightName;
    description: string;
    title: string;
    totalValue: number;
    diff: number | null;
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


export const Api = {
    async getAccounts(userId: string) {
        return (await api.get<IAccount[]>('/instagram', { params: { userId } })).data
    },

    async createAccounts({ userId, token }: { userId: string, token: string }) {
        return (await api.post(`/instagram`, { userId, token })).data
    },

    async getAccountInsights({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await api.get<IAccountInsights[]>(`/instagram/${accountId}/insights`, {
            params: { userId, period }
        })).data
    },

    async getAccountOnlineFollowers({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await api.get<IAccountOnlineFollowers>(`/instagram/${accountId}/online-followers`, {
            params: { userId, period }
        })).data
    },

    async getAccountFollowersCount({ accountId, userId, period }: { accountId: string, userId: string, period: { since: number, until: number } }) {
        return (await api.get<IAccountFollowersCount>(`/instagram/${accountId}/followers-count`, {
            params: { userId, period }
        })).data
    }
}
