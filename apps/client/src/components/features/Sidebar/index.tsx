import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserChip from "../../shared/UserChip";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

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
        <aside className={cn(className, "bg-secondary rounded-3xl p-2 sticky top-10 h-[calc(100vh-theme(space.20))]")}>
            <div>
                <Select defaultValue={accountId}>
                    <SelectTrigger className="focus:ring-0 bg-transparent ring-offset-secondary border-b-1 border-zinc-300 border-t-0 border-r-0 border-l-0 h-auto rounded-none">
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
            {/* <nav>
                <ul>
                    <li>
                        <span>Profile</span>
                    </li>
                    <li>
                        <span>Followers</span>
                    </li>
                </ul>
            </nav> */}
        </aside>
    )
}
