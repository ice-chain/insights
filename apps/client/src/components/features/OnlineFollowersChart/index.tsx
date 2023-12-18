import { addDays, getDay, startOfWeek } from "date-fns";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api } from "@/lib/api";
import { useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import isEmpty from 'lodash.isempty';
import { ChartLoader } from "../ChartLoader";
import { formatDate } from "@/lib/date";
import { DateRange } from "react-day-picker";
import { IAccountOnlineFollowers, THour } from "@repo/types";

interface OnlineFollowersChartProps {
    id: string;
    period?: DateRange;
}

interface OnlineFollowersChartContentProps {
    data: IAccountOnlineFollowers;
}

type DayOfWeek =  0 | 1 | 2 | 3 | 4 | 5 | 6;

const daysOfWeek: DayOfWeek[]  = [0, 1, 2, 3, 4, 5, 6];

const firstDOW = startOfWeek(new Date())

function joinDataByHours(value1: Record<THour, number>, value2: Record<THour, number>) {
    const res = value1;

    for (const hour in value1) {
        res[hour as THour] = Math.max(
            value1[hour as THour],
            value2[hour as THour]
        );
    }

    return res;
}

export function OnlineFollowersChart(props: OnlineFollowersChartProps) {
    const { id, period } = props;

    const { user } = useUser();

    const onlineFollowers = useQuery({
        queryKey: ['insights-online-followers', id],
        queryFn: () => api.getAccountOnlineFollowers({
            userId: user!.id,
            accountId: id,
            period
        })
    });

    return (
        <ChartLoader
            query={onlineFollowers}
            renderChart={(data) => <OnlineFollowersChartContent data={data} />}
        />

    )
}

function OnlineFollowersChartContent(props: OnlineFollowersChartContentProps) {
    const { data } = props;

    const [day, setDay] = useState<DayOfWeek>(0);

    const values = useMemo(() => {
        return data.values.reduce((res, value) => {
            const dayOfWeek = getDay(new Date(value.end_time));

            if(!res[dayOfWeek]) {
                res[dayOfWeek] = value.value;
            } else {
                res[dayOfWeek] = joinDataByHours(value.value, res[dayOfWeek]);
            }

            return res;

        }, {} as Record<DayOfWeek, Record<THour, number>>)
    }, [data.values]);

    const dataToShow = useMemo(() => {
        return Object.entries(values[day]).map(([ hour, value ]) => {
            return {
                hour,
                value,
            }
        })
    }, [day, values]);

    return (
        <div className="bg-secondary/30 rounded-3xl p-8">
            <ToggleGroup
                className="mb-4"
                type="single"
                value={String(day)}
                onValueChange={(day) => setDay(Number(day) as DayOfWeek)}
            >
                {daysOfWeek.map(day => {
                    return (
                        <ToggleGroupItem
                            className="capitalize"
                            key={day}
                            value={String(day)}
                        >
                            {formatDate(addDays(firstDOW, day), 'eeee')}
                        </ToggleGroupItem>
                    );
                })}
            </ToggleGroup>
            {
                isEmpty(dataToShow) ? (
                    'No data to show'
                ) : (
                    <ResponsiveContainer height={300}>
                        <BarChart data={dataToShow}>
                            <XAxis dataKey="hour" />
                            <Bar dataKey="value" fill="#8884d8">
                                <LabelList dataKey="value" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )
            }
        </div>
    );
}
