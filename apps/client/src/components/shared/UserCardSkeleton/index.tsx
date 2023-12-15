import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';

export function UserCardSkeleton() {
    const { t } = useTranslation();
    return (
        <article className={cn("flex gap-12 p-4 rounded-3xl justify-center bg-secondary")}>
            <div className="flex flex-col gap-3 w-full items-center">
                <Skeleton className="h-[48px] w-[48px] rounded-full bg-primary" />
                <div className="text-ellipsis flex flex-col items-center gap-1">
                    <Skeleton className="bg-primary h-4 w-48" />
                    <Skeleton className="bg-primary h-4 w-24" />
                </div>
                <div className="grid grid-cols-3 text-xs w-full">
                    <div className="flex flex-col gap-1 items-center">
                        <Skeleton className="bg-primary h-4 w-8" />
                        <span className="text-muted-foreground">
                            {t('userCard.followers')}

                        </span>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <Skeleton className="bg-primary h-4 w-8" />
                        <span className="text-muted-foreground">
                            {t('userCard.posts')}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <Skeleton className="bg-primary h-4 w-8" />
                        <span className="text-muted-foreground">
                            {t('userCard.follows')}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
