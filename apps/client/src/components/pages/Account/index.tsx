import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { addDays } from 'date-fns';
import { Metric } from '@/components/shared/Metric';
import { RootLayout } from '@/components/shared/RootLayout';
import { Sidebar } from '@/components/features/Sidebar';
import { Api } from '@/lib/api';
import { OnlineFollowersChart } from '@/components/features/OnlineFollowersChart';

export function Account() {
    const params = useParams({ from: '/authenticated-layout/dashboard/$id' });

    const { user } = useUser();

    const accounts = useQuery({
        queryKey: ['accounts', user!.id],
        queryFn: () => Api.getAccounts(user!.id),
    });

    const insights = useQuery({
        queryKey: ['insights', params.id],
        queryFn: () => Api.getAccountInsights({
            userId: user!.id,
            accountId: params.id,
            period: {
                since: Math.floor(addDays(new Date(), -7).getTime() / 1000),
                until: Math.floor(new Date().getTime() / 1000),
            }
        })
    });

    if (insights.isPending || accounts.isPending) {
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
                    <div className="grid gap-4 grid-cols-4 w-full h-max">
                        {insights.data.map(metric => {
                            return (
                                <Metric
                                    key={metric.id}
                                    title={metric.title}
                                    value={metric.totalValue}
                                    hint={metric.description}
                                    diff={metric.diff ?? 0}
                                />
                            )
                        })}
                    </div>
                    <div className="grid gap-4 grid-cols-1 w-full h-3/6">
                        <OnlineFollowersChart
                            id={params.id}
                        />
                    </div>
                </div>
            </main>
        </RootLayout>
    );
}