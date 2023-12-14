import { useMemo } from "react";
import { addDays, format } from "date-fns";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Api, IAccountInsights } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { ChartLoader } from "../ChartLoader";

interface InteractionsChartProps {
    id: string;
}

interface InteractionsChartContentProps {
    data: IAccountInsights[];
}

export function InteractionsChart(props: InteractionsChartProps) {
    const { id } = props;

    const { user } = useUser();

    const interactionsQuery = useQuery({
        queryKey: ['interactions', id],
        queryFn: () => Api.getAccountInteractions({
            userId: user!.id,
            accountId: id,
            period: {
                since: Math.floor(addDays(new Date(), -7).getTime() / 1000),
                until: Math.floor(new Date().getTime() / 1000),
            }
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

    // const values = useMemo(() => {
    //     return data.map(({ totalValue }) => {
    //         return {
    //             value,
    //             time: format(new Date(end_time), 'd MMM'),
    //         };
    //     })
    // }, [data]);

    return (
        'lol'
        // <ResponsiveContainer height={300}>
        //     <AreaChart data={values}>
        //         <XAxis dataKey="time" />
        //         <YAxis
        //             type="number"
        //             allowDecimals={false}
        //             domain={([dataMin, dataMax]) => {
        //                 const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
        //                 return [-absMax, absMax];
        //             }}
        //         />
        //         <ReferenceLine y={0} stroke="white" />
        //         <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="#8884d8" />
        //     </AreaChart>
        // </ResponsiveContainer>
    );
}
