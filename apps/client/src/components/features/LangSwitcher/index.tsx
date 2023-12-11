import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LangSwitcher({ className }: { className?: string }) {
    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className={cn(className, 'rounded-full')}
            >
                <Globe size={20} />
                <span className="sr-only">Change language</span>
            </Button>
        </>
    );
}
