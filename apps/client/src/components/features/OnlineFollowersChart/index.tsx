import { addDays, format } from "date-fns";
import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis } from "recharts";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Api, IAccountOnlineFollowers, THour } from "@/lib/api";
import { useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import isEmpty from 'lodash.isempty';

interface OnlineFollowersChartProps {
    id: string;
}

interface OnlineFollowersChartContentProps {
    data: IAccountOnlineFollowers;
}

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const daysOfWeek: DayOfWeek[]  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
    const { id } = props;

    const { user } = useUser();

    const onlineFollowers = useQuery({
        queryKey: ['online-followers', id],
        queryFn: () => Api.getAccountOnlineFollowers({
            userId: user!.id,
            accountId: id,
            period: {
                since: Math.floor(addDays(new Date(), -7).getTime() / 1000),
                until: Math.floor(new Date().getTime() / 1000),
            }
        })
    });

    if (onlineFollowers.isLoading) {
        return 'Loading...';
    }

    if (onlineFollowers.isError) {
        return 'Error...';
    }

    return (
        <OnlineFollowersChartContent data={onlineFollowers.data!} />
    )
}

function OnlineFollowersChartContent(props: OnlineFollowersChartContentProps) {
    const { data } = props;

    const [day, setDay] = useState<DayOfWeek>('Monday');

    const values = useMemo(() => {
        return data.values.reduce((res, value) => {
            const dayOfWeek = format(new Date(value.end_time), 'eeee') as DayOfWeek;

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
                value={day}
                onValueChange={(day) => setDay(day as DayOfWeek)}
            >
                {daysOfWeek.map(day => {
                    return (
                        <ToggleGroupItem
                            key={day}
                            value={day}
                        >
                            {day}
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
                            hello
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
