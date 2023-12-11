import { UserButton } from '@clerk/clerk-react';
import { Logo } from '@/components/shared/Logo';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { LangSwitcher } from '@/components/features/LangSwitcher';

function Topbar() {
    return (
        <div className="flex justify-between px-16 py-2">
            <Logo />
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <LangSwitcher />
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
