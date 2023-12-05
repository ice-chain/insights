import { UserButton } from '@clerk/clerk-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { Logo } from '@/components/shared/Logo';

function Topbar() {
    return (
        <div className="flex justify-between px-40 py-2 border-b">
            <Logo />
            <div className="flex items-center gap-4">
                <ThemeToggle />
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
