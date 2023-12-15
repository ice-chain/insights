import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';
import { supportedLngs } from '@/i18n';
import ISO6391 from 'iso-639-1';
import { useQueryClient } from '@tanstack/react-query';

export function LangToggle({ className }: { className?: string }) {
    const { t, i18n } = useTranslation();
    const queryClient = useQueryClient()

    const handleValueChange = (lang: string) => {
        i18n.changeLanguage(lang);
        queryClient.invalidateQueries({
            predicate: (query) => (query.queryKey[0] as string).startsWith('insights-'),
            refetchType: 'all',
        })
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(className, 'rounded-full')}
                    title={t('langToggle')}
                >
                    <Globe size={20} />
                    <span className="sr-only">{t('langToggle')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={i18n.language} onValueChange={handleValueChange}>
                    {supportedLngs.map(lng => (
                        <DropdownMenuRadioItem
                            key={lng}
                            value={lng}
                        >
                            {ISO6391.getNativeName(lng)}
                        </DropdownMenuRadioItem>

                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
