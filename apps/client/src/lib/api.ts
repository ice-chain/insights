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
    }
}
