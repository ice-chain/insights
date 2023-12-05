import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/lib/api";

const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;
const { href } = window.location;

const authUrl = new URL('/v18.0/dialog/oauth', 'https://www.facebook.com');
authUrl.searchParams.set('client_id', FB_APP_ID);
authUrl.searchParams.set('display', 'page');
authUrl.searchParams.set('extras', '{"setup":{"channel":"IG_API_ONBOARDING"}}');
authUrl.searchParams.set('redirect_uri', href);
authUrl.searchParams.set('response_type', 'token');
authUrl.searchParams.set('scope', ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_insights', 'pages_show_list', 'pages_read_engagement'].join(','));


interface ConnectInstagramProps {
    userId: string;
    onLoad: () => void;
    onLoadSuccess: () => void;
    onLoadError: () => void;
}

function ConnectInstagram(props: ConnectInstagramProps) {
    const {
        userId,
        onLoad,
        onLoadSuccess,
        onLoadError,
    } = props;

    const routerState = useRouterState();

    const mutation = useMutation({
        mutationFn: Api.createUserAccounts,
        onSuccess: onLoadSuccess,
        onError: onLoadError,
    });

    const navigate = useNavigate();

    const { hash, pathname } = routerState.location;
    const accessToken = new URLSearchParams(hash).get('access_token');

    useEffect(() => {
        if (accessToken) {
            onLoad();
            mutation.mutate({ userId, token: accessToken });
            navigate({
                to: pathname,
                // @ts-expect-error avoid type never
                params: {},
                hash: () => '',
                replace: true,
            });
        } else {
            console.log('No');
        }
    }, [hash, pathname, navigate, onLoad, accessToken, mutation, userId]);

    return (
        <div
            className="flex justify-center items-center p-4 bg-secondary rounded-md hover:cursor-pointer"
            title="Add account"
        >
            <Link
                to={authUrl.toString()}
                title="Login to Facebook"
            >
                <Plus size={36} strokeWidth={2} />
            </Link>
        </div>
    );
}

export default ConnectInstagram