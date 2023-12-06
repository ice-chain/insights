import UserPic from '../UserPic';
import { cn } from '@/lib/utils';

interface UserChipProps {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    className?: string;
}

function UserChip(props: UserChipProps) {
    const {
        id,
        name,
        username,
        imgUrl,
        className,
    } = props;

    return (
        <div
            className={cn("flex gap-2 items-center", className)}
        >
            <UserPic
                size={28}
                image={imgUrl}
                name={name}
                id={id}
            />
            <div className="text-ellipsis whitespace-nowrap flex flex-col items-start">
                <span
                    className="text-sm"
                >
                    {name}
                </span>
                <span
                    className="text-xs text-muted-foreground"
                >
                    @{username}
                </span>
            </div>
        </div>
    );
}

export default UserChip;
