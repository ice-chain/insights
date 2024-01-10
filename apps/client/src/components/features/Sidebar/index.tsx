import { Plus } from "lucide-react";
import { Link } from '@tanstack/react-router';

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserChip from "@/components/shared/UserChip";
import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
    accountId: string;
    accounts: {
        id: string;
        name: string;
        username: string;
        pictureUrl: string;
    }[];
}

export function Sidebar(props: SidebarProps) {
    const {
        className,
        accountId,
        accounts,
    } = props;

    return (
        <aside className={cn(className, "bg-secondary rounded-3xl p-2 sticky top-10 h-[calc(100vh-theme(space.20))] z-30")}>
            <div>
                <Select defaultValue={accountId}>
                    <SelectTrigger className="focus:ring-0 bg-transparent ring-offset-secondary border-b-1 border-zinc-300/20 border-t-0 border-r-0 border-l-0 h-auto rounded-none">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {accounts.map(account => {
                                return (
                                    <SelectItem
                                        key={account.id}
                                        value={account.id}
                                    >
                                        <UserChip
                                            id={account.id}
                                            name={account.name}
                                            username={account.username}
                                            imgUrl={account.pictureUrl}
                                        />
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                        <SelectGroup>
                            <Button
                                variant="ghost"
                                className="w-full"
                            >
                                <Plus />
                            </Button>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <nav>
                <ul className="flex flex-col gap-4 px-4 py-10 text-sm font-normal">
                    <li>
                        <a href="#overview">
                            Profile
                        </a>
                    </li>
                    <li>
                        <a href="#interactions">
                            Interactions
                        </a>
                    </li>
                    <li>
                        <a href="#followers">
                            Followers
                        </a>
                    </li>
                    <li>
                        <a href="#audience">
                            Audience
                        </a>
                    </li>
                    <div className="h-10"/>
                    <li>
                         <a href="#">
                            All Posts
                        </a>
                    </li>
                    <li>
                         <a href="#">
                            All Stories
                        </a>
                    </li>
                    <li>
                         <a href="#">
                            All Ads
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
