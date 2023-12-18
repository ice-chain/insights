import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../ChartLoader";
import { DateRange } from "react-day-picker";
import { IAccountInteractions } from "@repo/types";

interface InteractionsChartProps {
    id: string;
    period?: DateRange;
}

interface InteractionsChartContentProps {
    data: IAccountInteractions[];
}

export function InteractionsChart(props: InteractionsChartProps) {
    const { id, period } = props;

    const { user } = useUser();

    const interactionsQuery = useQuery({
        queryKey: ['insights-interactions', id],
        queryFn: () => api.getAccountInteractions({
            userId: user!.id,
            accountId: id,
            period,
        })
    });

    return (
        <ChartLoader
            query={interactionsQuery}
            renderChart={(data) => <InteractionsChartContent data={data} />}
        />
    );
}

function InteractionsChartContent(props: InteractionsChartContentProps) {
    const { data } = props;

    return (
        <>
            {data.map(metric => {
                const { value, breakdowns } = metric.totalValue;

                const data = (breakdowns[0].results ?? []).map(({ value, dimension_values }) => {
                    return {
                        value,
                        mediaType: dimension_values[0],
                    };
                });

                return (
                    <ResponsiveContainer
                        height={300}
                        key={metric.id}
                    >
                        <PieChart>
                            <defs>
                                <linearGradient id="colorPie-POST" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D300C5" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#7638FA" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="colorPie-REEL" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF0169" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="colorPie-STORY" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFD600" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <text x="50%" y="43%" textAnchor="middle" fill="#ddd">
                                {value}
                            </text>
                            <text x="50%" y="50%" textAnchor="middle" fill="#ddd">
                                {metric.title}
                            </text>
                            {data.length === 0 ? (
                                <Pie
                                    data={[{ value: 1, mediaType: 'No data' }]}
                                    dataKey="value"
                                    nameKey="mediaType"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#333"
                                    strokeWidth={0}

                                />
                            ) : (
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="mediaType"
                                    innerRadius={60}
                                    outerRadius={80}
                                >
                                    {data.map(({ mediaType }) => (
                                        <Cell
                                            key={`cell-${mediaType}`}
                                            fill={`url(#colorPie-${mediaType})`}
                                            strokeWidth={0}
                                        />
                                    ))}
                                </Pie>
                            )}
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                );
            })}
        </>
    );
}
