import { UserButton } from '@clerk/clerk-react';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { LangToggle } from '@/components/features/LangToggle';

function Topbar() {
    return (
        <div className="flex justify-between px-16 py-2">
            <Logo />
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <LangToggle />
                    <ThemeToggle />
                </div>
                <UserButton
                    appearance={{
                        elements: {
                            userButtonAvatarBox: "h-9 w-9"
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default Topbar;
