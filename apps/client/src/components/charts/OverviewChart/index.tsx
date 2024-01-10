import { api } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../../features/ChartLoader";
import { DateRange } from "react-day-picker";
import { IAccountOverview } from "@repo/types";
import { Metric } from "@/components/shared/Metric";

interface OverviewChartProps {
    id: string;
    period?: DateRange;
}

interface OverviewChartContentProps {
    data: IAccountOverview[];
}

export function OverviewChart(props: OverviewChartProps) {
    const { id, period } = props;

    const { user } = useUser();

    const insights = useQuery({
        queryKey: ['insights-overview', id, period],
        queryFn: () => api.getAccountInsightsOverview({
            userId: user!.id,
            accountId: id,
            period,
        })
    });

    return (
        <ChartLoader
            columns={4}
            query={insights}
            renderChart={(data) => <OverviewChartContent data={data} />}
        />
    );
}

function OverviewChartContent(props: OverviewChartContentProps) {
    const { data } = props;

    return (
        <>
            {data.map(metric => {
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
        </>
    );
}
