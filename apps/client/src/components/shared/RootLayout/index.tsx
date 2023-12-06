import React from 'react';
import Topbar from '@/components/features/Topbar';

export function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />
            {children}
        </div>
    );
}
