import { GetStarted } from "@/components/features/GetStarted";
import { RootLayout } from "@/components/shared/RootLayout";

export function Home() {
  return (
    <RootLayout>
      <main className="px-16 py-10">
        <GetStarted />
      </main>
    </RootLayout>
  );
}


