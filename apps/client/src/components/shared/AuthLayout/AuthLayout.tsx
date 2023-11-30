import React from 'react';

import { ClerkProvider } from '@clerk/nextjs';
import { Inter, Kalam } from 'next/font/google';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import { ThemeValue, ThemeProvider } from '@/components/theme/theme-provider';

import '../globals.css';
import { Logo } from '@/components/shared/Logo';

export const metadata = {
    title: 'Threads',
    description: 'A Next.js App',
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
                layout: {
                    logoPlacement: 'none',
                },
                elements: {
                    formButtonPrimary: "bg-gradient-to-r from-[#B900B4] to-[#F50000]",
                    card: 'bg-white/30 backdrop-blur-md',
                    headerSubtitle: 'hidden',
                },
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
                        <div className="flex py-3 flex-col min-h-screen w-full bg-[url('/assets/background.png')]">
                            <Logo vertical />
                            <div className="w-full flex-1 flex flex-col justify-center items-center">
                                {children}
                            </div>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}


