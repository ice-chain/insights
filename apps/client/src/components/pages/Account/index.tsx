import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { useUser } from '@clerk/clerk-react';
import { addDays } from 'date-fns';
import { RootLayout } from '@/components/shared/RootLayout';
import { Sidebar } from '@/components/features/Sidebar';
import { api } from '@/lib/api';
import { OnlineFollowersChart } from '@/components/charts/OnlineFollowersChart';
import { FollowersCountChart } from '@/components/charts/FollowersCountChart';
import { InteractionsChart } from '@/components/charts/InteractionsChart';
import { PeriodSelector } from '@/components/features/PeriodSelector';
import { OverviewChart } from '@/components/charts/OverviewChart';
import { DemographicChart } from '@/components/charts/DemographicChart';
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

    if (accounts.isPending) {
        // TODO: skeleton
        return 'Loading...';
    }

    if (accounts.isError) {
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
                    <main className="col-span-5 grid grid-flow-row main">
                        <div className="sticky-topbar">
                            <div className="bg-secondary rounded-3xl w-full px-2 ">
                                <PeriodSelector
                                    className="w-full flex justify-end"
                                    onChange={setPeriod}
                                    value={period}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 grid-flow-row">
                            <div className="grid-row grid-cols-4" id="overview">
                                <OverviewChart
                                    id={params.id}
                                    period={period}
                                />
                            </div>
                            <div className="grid-row grid-cols-4" id="interactions">
                                <InteractionsChart
                                    id={params.id}
                                    period={period}
                                />
                            </div>
                            <div className="grid-row grid-cols-1" id="followers">
                                <OnlineFollowersChart
                                    id={params.id}
                                    period={period}
                                />
                            </div>
                            <div className="grid-row grid-cols-2">
                                <FollowersCountChart
                                    id={params.id}
                                    period={period}
                                />
                                <DemographicChart
                                    id={params.id}
                                />
                            </div>
                            <div className="grid-row grid-cols-1">

                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </RootLayout>
    );
}
