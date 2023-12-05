import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: "/api",
});

interface IUserAccount {
    id: string;
    name: string;
    username: string;
    pictureUrl: string;
    posts: string | number,
    follows: string | number,
    followers: string | number,
    provider: 'instagram';
}

export const Api = {
    async getUserAccounts(userId: string) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const accMock: IUserAccount = {
            id: '1',
            name: 'Aisel Sherfedin',
            username: 'aisel',
            pictureUrl: 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWHRXOHJhN1BibnMweHJnUFRtWHZvZVNjR0siLCJyaWQiOiJ1c2VyXzJZejY5OTQ0ZmNBTGZBYlRTYUJzenBveVViWCJ9?width=160',
            provider: 'instagram',
            posts: 300,
            follows: 300,
            followers: 300,
        };

        return {accounts : [accMock]}
        // return (await api.get<IUserAccounts>('/accounts', { data: { userId } })).data
    },

    async createUserAccounts({ userId, token }: { userId: string, token: string }) {
        return (await api.post(`/accounts`, { data: { userId, token } })).data
    },
}
