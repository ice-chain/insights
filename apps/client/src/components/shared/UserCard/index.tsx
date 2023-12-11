import { useNavigate } from '@tanstack/react-router';
import UserPic from '../UserPic';
import { cn } from '@/lib/utils';

interface UserCardProps {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    posts: string | number;
    followers: string | number;
    follows: string | number;
    className?: string;
}

function UserCard(props: UserCardProps) {
    const {
        id,
        name,
        username,
        imgUrl,
        posts,
        followers,
        follows,
        className,
    } = props;

    const navigate = useNavigate();

    return (
        <article
            className={cn("flex gap-12 p-4 bg-secondary rounded-3xl hover:cursor-pointer justify-center", className)}
            onClick={() => {
                navigate({ to: '/dashboard/$id', params: { id } })
            }}
        >
            <div className="flex flex-col gap-3 w-full items-center">
                <UserPic
                    size={48}
                    image={imgUrl}
                    name={name}
                    id={id}
                />
                <div className="text-ellipsis flex flex-col items-center">
                    <h4
                        className="text-lg"
                    >
                        {name}
                    </h4>
                    <p
                        className="text-xs text-muted-foreground"
                    >
                        @{username}
                    </p>
                </div>
                <div className="grid grid-cols-3 text-xs w-full">
                    <div className="flex flex-col gap-1 items-center">
                        <span>
                            {followers}
                        </span>
                        <span className="text-muted-foreground">
                            Followers
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <span>
                            {posts}
                        </span>
                        <span className="text-muted-foreground">
                            Posts
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <span>
                            {follows}
                        </span>
                        <span className="text-muted-foreground">
                            Follows
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default UserCard;
