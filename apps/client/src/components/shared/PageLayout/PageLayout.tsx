import React from 'react';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Kalam } from 'next/font/google';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { ThemeValue, ThemeProvider } from '@/components/theme/theme-provider';

import '../globals.css';
import { Logo } from '@/components/shared/Logo';
import Topbar from '@/components/shared/Topbar';

export const metadata = {
    title: 'Insights',
    description: 'Social media insights',
};

const inter = Inter({
    subsets: ['latin'],
});

const kalam = Kalam({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-kalam',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const { theme } = useTheme();

    return (
        <ClerkProvider
            appearance={{
                // baseTheme: theme === ThemeValue.dark ? dark : undefined,
            }}
        >
            <html lang="en">
                <body className={`${inter.className} ${kalam.variable}`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex flex-col min-h-screen">
                            <Topbar />
                            {children}
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
