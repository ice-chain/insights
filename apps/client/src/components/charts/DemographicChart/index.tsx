import { ChartLoader } from "@/components/features/ChartLoader";
import { api } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { IAccountDemographics } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

interface  DemographicChartProps {
    id: string;
    period?: DateRange;
}

interface  DemographicChartContentProps {
    data: IAccountDemographics;
}


export function DemographicChart(props:  DemographicChartProps) {
    const { id } = props;

    const { user } = useUser();

    const demographicsQuery = useQuery({
        queryKey: ['demographic', id],
        queryFn: () => api.getAccountDemographic({
            userId: user!.id,
            accountId: id,
        }),
    });

    return (
        <ChartLoader
            query={demographicsQuery}
            renderChart={(data) => < DemographicChartContent data={data} />}
        />
    );
}

function DemographicChartContent(props: DemographicChartContentProps) {
    const { data } = props;

    const countries = data.values
        .find(({ dimension_key }) => dimension_key === 'country')?.results
        .reduce<Record<string, number>>((acc, item) => {
            const {
                dimension_values: [countryCode],
                value
            } = item;

            acc[countryCode] = value;

            return acc;
        }, {}) || {};

    return (
        <div>
            <ComposableMap>
                <Geographies geography="/geo.json" fill="#2a354d">
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            let fill = '#2a354d'
                            if (countries[geo.id]) {
                                console.log(geo)
                                fill= 'red'
                            }

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={fill}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
}