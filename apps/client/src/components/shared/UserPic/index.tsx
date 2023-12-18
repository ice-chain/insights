import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

interface UserPicProps {
    name: string;
    image: string;
    id: string;
    size: number;
    className?: string;
}

function UserPic(props: UserPicProps) {
    const {
        id,
        name,
        image,
        size,
        className,
    } = props;

    return (
        <Link
            to={`/dashboard/$id`}
            params={{ id }}
            className="relative inline-block"
            style={{ width: size, height: size }}
            title={name}
        >
            <img
                src={image}
                alt={`${name}'s profile image`}
                className={cn([
                    className,
                    'cursor-pointer rounded-full object-cover',
                ])}
            />
        </Link>
    );

}

export default UserPic;
