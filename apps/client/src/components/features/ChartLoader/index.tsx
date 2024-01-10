import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ChartSkeleton } from "../ChartSkeleton";

interface ChartLoaderProps<T> {
    query: UseQueryResult<T>;
    renderChart: (data: T) => ReactNode;
    columns?: number;
}

export function ChartLoader<T>(props: ChartLoaderProps<T>) {
    const { query, renderChart, columns = 1 } = props;

    if (query.isLoading) {
        return (
            <>
                {
                    Array(columns).fill(null).map((_, i) => {
                        return <ChartSkeleton key={i} />;
                    })
                }
            </>
        )
    }

    if (query.isError) {
        return 'Error...';
    }

    return (
        renderChart(query.data!)
    )
}