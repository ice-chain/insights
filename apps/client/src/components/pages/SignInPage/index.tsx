import { ThemeValue } from '@/components/theme/theme-provider';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export default function Page() {
    const { theme } = useTheme();

    return <SignIn
        appearance={{
            baseTheme: theme === ThemeValue.dark ? dark : undefined,
            elements: {
                formButtonPrimary: "bg-gradient-to-r from-[#B900B4] to-[#F50000]",
                card: 'bg-white/30 backdrop-blur-md',
                headerSubtitle: 'hidden',
            },
        }}
    />;
}