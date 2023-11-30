import React from 'react';
import { dark } from '@clerk/themes';
import { useTheme } from '@/components/shared/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <ClerkProvider
            appearance={{
                baseTheme: theme === 'dark' ? dark : undefined,
            }}
        >
            <body className="font-kalam">
                    <div className="flex flex-col min-h-screen">
                        {children}
                    </div>
            </body>
        </ClerkProvider>
    );
}
