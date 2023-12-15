import UserCard from "@/components/shared/UserCard";
import ConnectInstagram from "@/components/features/ConnectInstagram";
import { useState } from "react";
import { UserCardSkeleton } from "@/components/shared/UserCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTranslation } from "react-i18next";

interface AccountsListProps {
    userId: string;
}

export function AccountsList(props: AccountsListProps) {
    const { userId } = props;

    const { t } = useTranslation();

    const [newAccountLoading, setNewAccountLoading] = useState(false);

    const { data, isError, isPending, isSuccess } = useQuery({
        queryKey: ['accounts', userId],
        queryFn: () => api.getAccounts(userId),
    });

    if (isError) {
        return "Error message";
    }

    const onLoad = () => {
        setNewAccountLoading(true);
    }

    const onLoadEnd = () => {
        setNewAccountLoading(false);
    }

    const noAccounts = isSuccess && data.length === 0;

    return (
        <>
            {noAccounts && (
                <p className="mb-10">
                    {t('accountList.connect')}
                </p>
            )}
            <div className="grid grid-cols-4 gap-4">
                {
                    isPending ? (
                        <UserCardSkeleton />
                    ): (
                        data.map(account => {
                            return (
                                <UserCard
                                    key={account.id}
                                    id={account.id}
                                    name={account.name}
                                    username={account.username}
                                    imgUrl={account.pictureUrl}
                                    posts={account.posts}
                                    follows={account.follows}
                                    followers={account.followers}
                                />
                            );
                        })
                    )
                }
                {newAccountLoading && (
                    <UserCardSkeleton />
                )}
                <ConnectInstagram
                    userId={userId}
                    onLoad={onLoad}
                    onLoadSuccess={onLoadEnd}
                    onLoadError={onLoadEnd}
                />
            </div>
        </>
    );
}
