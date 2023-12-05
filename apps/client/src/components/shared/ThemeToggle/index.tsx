import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from '@/components/app/ThemeProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme();

    const handleClick = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
            <Button
                variant="secondary"
                size="icon"
                className={cn(className, 'rounded-lg')}
                onClick={handleClick}
            >
                <Sun size={22} strokeWidth={1} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonStar size={22} strokeWidth={1} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    );
}
