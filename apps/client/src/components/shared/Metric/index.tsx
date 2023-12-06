import { Info } from 'lucide-react';

interface MetricProps {
    name: string;
    title: string;
    value: number;
    hint: string;
    trend?: 'growth' | 'fall'
}

export function Metric(props: MetricProps) {
    const {
        name,
        title,
        value,
        // hint,
    } = props;


    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="text-sm font-medium flex gap-4">
                {name}
                <Info size={20} />
            </div>
            <div>
                <p className="text-2xl font-bold">
                    {value}
                </p>
                <span className="text-xs text-muted-foreground">
                    {title}
                </span>
            </div>
        </div>
    );
}
