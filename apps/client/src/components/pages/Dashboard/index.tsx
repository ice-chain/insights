// import LeftSidebar from '@/components/shared/LeftSidebar';
import { Chart } from '@/components/shared/Chart';
import { Metric } from '@/components/shared/Metric';
import { RootLayout } from '@/components/shared/RootLayout';
import { Api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

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

export function Dashboard() {
    const params = useParams({ from: '/dashboard/$id' });

    const { isPending, data, error } = useQuery({
        queryKey: ['insights', params.id],
        queryFn: () => Api.getAccountInsights({ accountId: params.id, period: '' })
    });

    if (isPending) {
        // TODO: skeleton
        return 'Loading...';
    }

    if (error) {
        return 'Error';
    }

    return (
        <RootLayout>
            <main className="flex flex-col gap-4 px-40 py-10">
                {/* <LeftSidebar /> */}
                <div className="grid gap-4 grid-cols-4 w-full">
                    {overviewInsights.map(metric => {
                        return (
                            <Metric
                                key={metric.slug}
                                name={metric.name}
                                title={metric.name}
                                value={data[metric.slug].total_value.value}
                                hint=""
                            />
                        )
                    })}
                </div>
                <div className="grid gap-4 grid-cols-2 h-72">
                    <Chart />
                    <Chart />
                </div>
            </main>
        </RootLayout>

    );
}