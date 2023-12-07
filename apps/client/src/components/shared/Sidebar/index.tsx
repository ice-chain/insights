import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserChip from "../UserChip";
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
        <aside className={cn(className, "bg-secondary/30 backdrop-blur-md rounded-3xl p-2 sticky top-10 h-[calc(100vh-theme(space.20))]")}>
            <div>
                <Select defaultValue={accountId}>
                    <SelectTrigger className="border-none focus:ring-0 bg-transparent border-b ">
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
                            <Button>Add</Button>
                        </SelectGroup>

                    </SelectContent>
                </Select>
            </div>
            <div>
                <div>Profile</div>
                <div>Followers</div>
            </div>
        </aside>
    )
}
