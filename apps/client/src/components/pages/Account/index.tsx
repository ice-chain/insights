import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { addDays } from 'date-fns';
import { Metric } from '@/components/shared/Metric';
import { RootLayout } from '@/components/shared/RootLayout';
import { Sidebar } from '@/components/features/Sidebar';
import { api } from '@/lib/api';
import { OnlineFollowersChart } from '@/components/features/OnlineFollowersChart';
import { FollowersCountChart } from '@/components/features/FollowersCountChart';
import { InteractionsChart } from '@/components/features/InteractionsChart';
import { PeriodSelector } from '@/components/features/PeriodSelector';
import './index.css';

const initialPeriod = {
    from: addDays(new Date(), -7),
    to: new Date(),
}

export function Account() {
    const params = useParams({ from: '/authenticated-layout/dashboard/$id' });

    const [period, setPeriod] = useState<DateRange | undefined>(initialPeriod);

    const { user } = useUser();

    const accounts = useQuery({
        queryKey: ['accounts', user!.id],
        queryFn: () => api.getAccounts(user!.id),
    });

    const insights = useQuery({
        queryKey: ['insights-overview', params.id],
        queryFn: () => api.getAccountInsightsOverview({
            userId: user!.id,
            accountId: params.id,
            period,
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
            <div className="pb-10 px-16 flex flex-col gap-4">
                <div className="grid gap-4 grid-cols-6 flex-1 relative">
                    <Sidebar
                        className="col-span-1"
                        accountId={params.id}
                        accounts={accounts.data}
                    />
                    <main className="col-span-5 grid grid-flow-row">
                        <div className="sticky-topbar">
                            <div className="bg-secondary rounded-3xl w-full px-2 ">
                                <PeriodSelector
                                    className="w-full flex justify-end"
                                    onChange={setPeriod}
                                    value={period}
                                />
                            </div>
                        </div>
                        <div className=" grid grid-flow-row gap-4">
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
                                    period={period}
                                />
                            </div>
                            <div className="grid gap-4 grid-cols-2 w-full h-3/6">
                                <FollowersCountChart
                                    id={params.id}
                                    period={period}
                                />
                            </div>
                            <div className="grid gap-4 grid-cols-4 w-full h-3/6">
                                <InteractionsChart
                                    id={params.id}
                                    period={period}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </RootLayout>
    );
}