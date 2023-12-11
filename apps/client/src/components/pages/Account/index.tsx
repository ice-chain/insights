import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Chart } from '@/components/shared/Chart';
import { Metric } from '@/components/shared/Metric';
import { RootLayout } from '@/components/shared/RootLayout';
import { Sidebar } from '@/components/shared/Sidebar';
import { Api } from '@/lib/api';
import { useUser } from '@clerk/clerk-react';

type Slug =
| 'reach'
| 'impressions'
| 'accounts_engaged'
| 'profile_views';

const overviewInsights: { name: string, slug: Slug }[] = [
    { name: 'Reach', slug: 'reach' },
    { name: 'Impressions', slug: 'impressions' },
    { name: 'Engagement', slug: 'accounts_engaged' },
    { name: 'Views', slug: 'profile_views' },
];

export function Account() {
    const params = useParams({ from: '/authenticated-layout/dashboard/$id' });

    const { user } = useUser();

    const insights = useQuery({
        queryKey: ['insights', params.id],
        queryFn: () => Api.getAccountInsights({ accountId: params.id, period: '' })
    });

    const accounts = useQuery({
        queryKey: ['accounts', user!.id],
        queryFn: () => Api.getAccounts(user!.id),
    });

    if (insights.isPending || accounts.isPending) {
        // TODO: skeleton
        return 'Loading...';
    }

    if (insights.isError || accounts.isError) {
        return 'Error';
    }

    return (
        <RootLayout>
            <main className="py-10 px-16 grid gap-4 grid-cols-6 flex-1 relative">
                <Sidebar
                    className="col-span-1"
                    accountId={params.id}
                    accounts={accounts.data}
                />
                <div className="col-span-5 grid gap-4 grid-flow-row">
                    <div className="grid gap-4 grid-cols-4 w-full">
                        {overviewInsights.map(metric => {
                            return (
                                <Metric
                                    key={metric.slug}
                                    name={metric.name}
                                    title={metric.name}
                                    value={insights.data[metric.slug].total_value.value}
                                    hint=""
                                />
                            )
                        })}
                    </div>
                    <div className="grid gap-4 grid-cols-2 h-72">
                        <Chart />
                        <Chart />
                    </div>
                    <div className="grid gap-4 grid-cols-2 h-72">
                        <Chart />
                        <Chart />
                    </div>
                    <div className="grid gap-4 grid-cols-2 h-72">
                        <Chart />
                        <Chart />
                    </div>
                    <div className="grid gap-4 grid-cols-2 h-72">
                        <Chart />
                        <Chart />
                    </div>
                    <div className="grid gap-4 grid-cols-2 h-72">
                        <Chart />
                        <Chart />
                    </div>
                </div>
            </main>
        </RootLayout>

    );
}