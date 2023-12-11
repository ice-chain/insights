import { RootLayout } from '@/components/shared/RootLayout';
import { useUser } from '@clerk/clerk-react';
import { AccountsList } from '@/components/features/AccountsList';

export function Dashboard() {
    const { user } = useUser();

    return (
        <RootLayout>
            <main className="px-16 py-10">
                <AccountsList userId={user!.id} />
            </main>
        </RootLayout>
    );
}