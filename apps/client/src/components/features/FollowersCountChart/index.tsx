import { useMemo } from "react";
import { addDays } from "date-fns";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { api, IAccountFollowersCount } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../ChartLoader";
import { formatDate } from "@/lib/date";
import { DateRange } from "react-day-picker";

interface FollowersCountChartProps {
    id: string;
    period?: DateRange;
}

interface FollowersCountChartContentProps {
    data: IAccountFollowersCount;
}

export function FollowersCountChart(props: FollowersCountChartProps) {
    const { id, period } = props;

    const { user } = useUser();

    const followersCountQuery = useQuery({
        queryKey: ['insights-followers-count', id],
        queryFn: () => api.getAccountFollowersCount({
            userId: user!.id,
            accountId: id,
            period,
        })
    });

    return (
        <ChartLoader
            query={followersCountQuery}
            renderChart={(data) => <FollowersCountChartContent data={data} />}
        />
    );
}

function FollowersCountChartContent(props: FollowersCountChartContentProps) {
    const { data } = props;

    const values = useMemo(() => {
        return data.values.map(({ value, end_time }) => {
            return {
                value,
                time: formatDate(new Date(end_time), 'd MMM'),
            };
        })
    }, [data.values]);

    return (
        <ResponsiveContainer height={300}>
            <AreaChart data={values}>
                <XAxis dataKey="time" />
                <YAxis
                    type="number"
                    allowDecimals={false}
                    domain={([dataMin, dataMax]) => {
                        const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
                        return [-absMax, absMax];
                    }}
                />
                <ReferenceLine y={0} stroke="white" />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
