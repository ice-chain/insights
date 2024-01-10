import { useMemo } from "react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { api } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../../features/ChartLoader";
import { formatDate } from "@/lib/date";
import { DateRange } from "react-day-picker";
import { IAccountFollowersCount } from "@repo/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

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
        queryKey: ['insights-followers-count', id, period],
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
        <div className="bg-secondary/30 rounded-3xl p-8">
            <div className="flex justify-between mb-4 text-sm font-medium">
                {data.title}
                <Popover>
                    <PopoverTrigger>
                        <Info size={20} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <h3 className="text-lg font-semibold">
                            {data.title}
                        </h3>
                        <p className="text-sm mt-4">
                            {data.description}
                        </p>
                    </PopoverContent>
                </Popover>
            </div>

            <ResponsiveContainer height={200}>
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
                    <ReferenceLine y={0} stroke="#7638FA" />
                    <Area type="monotone" dataKey="value" stroke="#7638FA" fillOpacity={1} fill="#7638FA" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
