import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, TrendingDown, TrendingUp } from 'lucide-react';

interface MetricProps {
    title: string;
    value: number;
    diff: number;
    hint: string;
}

export function Metric(props: MetricProps) {
    const {
        title,
        value,
        diff,
        hint,
    } = props;

    const diffPercents = (diff * 100).toFixed(2);

    const diffDisplayValue = diff > 0 ?
        `+${diffPercents}%` :
        `${diffPercents}%`;

    const trendIcon = diff > 0 ? <TrendingUp size={28}/> : <TrendingDown size={28}/>;
    const color = diff > 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="flex flex-col gap-4 rounded-3xl shadow bg-secondary/30 text-card-foreground p-6">
            <div className="text-sm font-medium flex gap-4 justify-between">
                {title}

                <Popover>
                    <PopoverTrigger>
                        <Info size={20} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <h3 className="text-lg font-semibold">
                            {title}
                        </h3>
                        <p className="text-sm mt-4">
                            {hint}
                        </p>
                    </PopoverContent>
                </Popover>

            </div>
            <div className="flex items-end gap-3">
                <div className="flex flex-col gap-1">
                    <span className="text-2xl font-bold">
                        {value}
                    </span>
                    {diff !== 0 && (
                        <span className={`text-xs ${color}`}>
                            {diffDisplayValue}
                        </span>
                    )}
                </div>
                {diff !== 0 && (
                    <span className={`${color}`}>
                        {trendIcon}
                    </span>
                )}
            </div>
        </div>
    );
}
