// import LeftSidebar from '@/components/shared/LeftSidebar';
import { Info } from 'lucide-react';

const overviewInsights = [
    { name: 'Reach', slug: 'reach' },
    // { name: 'Impressions', slug: 'impressions' },
    // { name: 'Engagement', slug: 'accounts_engaged' },
    // { name: 'Views', slug: 'profile_views' },
];

export function Dashboard({ params }: { params: { id: string } }) {
    const insightsInfo = {
        data: {
            reach: {
                title: 'reach',
                total_value: {
                    value: 20,
                }
            }
        }
    };

    const insights = insightsInfo.data!;

    return (
        <div className="flex px-40 gap-8 py-10">
           {/* <LeftSidebar /> */}
            <div className="grid gap-4 grid-cols-4 w-full">
                {overviewInsights.map(metric => {
                    return insights[metric.slug].total_value && (
                        <div key={metric.slug} className="flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow p-6">
                            <div className="text-sm font-medium flex gap-4">
                                {metric.name}
                                <Info size={20} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">
                                    {insights[metric.slug].total_value.value}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                    {insights[metric.slug].title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}