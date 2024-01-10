import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { api } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../../features/ChartLoader";
import { DateRange } from "react-day-picker";
import { IAccountInteractions } from "@repo/types";
import { useTranslation } from "react-i18next";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface InteractionsChartProps {
    id: string;
    period?: DateRange;
}

interface InteractionsChartContentProps {
    data: IAccountInteractions[];
}

enum MediaType {
    CAROUSEL_CONTAINER = 'CAROUSEL_CONTAINER',
    POST = 'POST',
    REEL = 'REEL',
    STORY = 'STORY',
    AD = 'AD',
    EMPTY = 'EMPTY',
}

const mediaToI18nKey = {
    [MediaType.REEL]: 'mediaType.reel',
    [MediaType.POST]: 'mediaType.post',
    [MediaType.AD]: 'mediaType.ad',
    [MediaType.STORY]: 'mediaType.story',
    [MediaType.CAROUSEL_CONTAINER]: 'mediaType.carousel',
    [MediaType.EMPTY]: 'mediaType.empty'
}

export function InteractionsChart(props: InteractionsChartProps) {
    const { id, period } = props;

    const { user } = useUser();

    const interactionsQuery = useQuery({
        queryKey: ['insights-interactions', id, period],
        queryFn: () => api.getAccountInteractions({
            userId: user!.id,
            accountId: id,
            period,
        })
    });

    return (
        <ChartLoader
            columns={4}
            query={interactionsQuery}
            renderChart={(data) => <InteractionsChartContent data={data} />}
        />
    );
}

function InteractionsChartContent(props: InteractionsChartContentProps) {
    const { data } = props;
    const { t } = useTranslation();

    return (
        <>
            {data.map(metric => {
                const { value, breakdowns } = metric.totalValue;

                const data = (breakdowns[0].results ?? []).map(({ value, dimension_values }) => {
                    return {
                        value,
                        mediaType: dimension_values[0],
                    };
                }).filter(({ value }) => value);

                return (
                    <div
                        key={metric.id}
                    >
                        <div className="text-sm font-medium flex gap-4 justify-end px-6 pt-6">
                            <Popover>
                                <PopoverTrigger>
                                    <Info size={20} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <h3 className="text-lg font-semibold">
                                        {metric.title}
                                    </h3>
                                    <p className="text-sm mt-4">
                                        {metric.description}
                                    </p>
                                </PopoverContent>
                            </Popover>

                        </div>
                        <ResponsiveContainer
                            height={230}
                        >
                            <PieChart>
                                <defs>
                                    <linearGradient id={`colorPie-${MediaType.POST}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D300C5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#7638FA" stopOpacity={0.8} />
                                    </linearGradient>
                                    <linearGradient id={`colorPie-${MediaType.REEL}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF0169" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
                                    </linearGradient>
                                    <linearGradient id={`colorPie-${MediaType.STORY}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFD600" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
                                    </linearGradient>
                                    <linearGradient id={`colorPie-${MediaType.CAROUSEL_CONTAINER}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00D600" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#007A00" stopOpacity={0.8} />
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
                                        data={[{ value: 1, mediaType: 'EMPTY' }]}
                                        name={t(mediaToI18nKey[MediaType.EMPTY])}
                                        dataKey="value"
                                        nameKey="mediaType"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#888"
                                        opacity={0.5}
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
                                                name={t(mediaToI18nKey[mediaType])}
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
                    </div>
                );
            })}
        </>
    );
}
