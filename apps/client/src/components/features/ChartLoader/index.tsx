import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ChartSkeleton } from "../ChartSkeleton";

interface ChartLoaderProps<T> {
    query: UseQueryResult<T>;
    renderChart: (data: T) => ReactNode;
}

export function ChartLoader<T>(props: ChartLoaderProps<T>) {
    const { query, renderChart } = props;

    if (query.isLoading) {
        return <ChartSkeleton />;
    }

    if (query.isError) {
        return 'Error...';
    }

    return (
        renderChart(query.data!)
    )
}