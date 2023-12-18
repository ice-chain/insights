import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useTranslation } from "react-i18next";

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
        mutationFn: api.createAccounts,
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
        }
    }, [hash, pathname, navigate, onLoad, accessToken, mutation, userId]);

    const { t } = useTranslation();

    return (
        <div
            className="flex justify-center items-center p-4 bg-secondary rounded-3xl hover:cursor-pointer"
            title={t('connectInstagram.add')}
        >
            {/* @ts-expect-error FIXME */}
            <Link
                to={authUrl.toString()}
            >
                <Plus size={36} strokeWidth={2} />
            </Link>
        </div>
    );
}

export default ConnectInstagram