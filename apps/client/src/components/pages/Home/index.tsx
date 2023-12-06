import { AccountsList } from "@/components/features/AccountsList";
import { GetStarted } from "@/components/features/GetStarted";
import { RootLayout } from "@/components/shared/RootLayout";
import { useUser } from '@clerk/clerk-react';

export function Home() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <RootLayout>
      <main className="px-40 py-10">
        {isSignedIn ? (
          <AccountsList userId={user.id} />
        ) : (
          <GetStarted />
        )}
      </main>
    </RootLayout>
  );
}


