export interface IAccount {
    id: string;
    name: string;
    username: string;
    pictureUrl: string;
    posts: string | number,
    follows: string | number,
    followers: string | number,
    provider: 'instagram';
}

type TMetricName =
| 'reach'
| 'impressions'
| 'accounts_engaged'
| 'profile_views';


interface IMetric {
    id: string;
    name: string;
    description: string;
    title: string;
}

export interface IAccountOverview extends IMetric {
    name: TMetricName;
    totalValue: number;
    diff: number | null;
}

type TInteractionsDimension = 'POST' | 'REEL' | 'AD' | 'STORY' | 'CAROUSEL_CONTAINER';

export interface IAccountInteractions extends IMetric {
    totalValue: {
        value: number;
        breakdowns: {
            results?: {
                value: number;
                dimension_values: TInteractionsDimension[]
            }[]
        }[];
    };
}

export type THour = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23';

export interface IAccountOnlineFollowers extends IMetric {
    values: {
        value: Record<THour, number>;
        end_time: string;
    }[]
}

export interface IAccountFollowersCount extends IMetric {
    values: {
        value: Record<THour, number>;
        end_time: string;
    }[]
}