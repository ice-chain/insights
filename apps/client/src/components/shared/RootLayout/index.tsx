import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
    );
}
