import React from 'react';
import { Logo } from '@/components/shared/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex py-3 flex-col min-h-screen w-full bg-[url('/assets/background.png')]">
            <Logo vertical />
            <div className="w-full flex-1 flex flex-col justify-center items-center">
                {children}
            </div>
        </div>
    );
}


