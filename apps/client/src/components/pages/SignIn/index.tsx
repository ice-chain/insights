import AuthLayout from '@/components/shared/AuthLayout';
import { SignIn as SignInClerk } from '@clerk/clerk-react';

export function SignIn() {
    return (
        <AuthLayout>
            <SignInClerk
                appearance={{
                    layout: {
                        logoPlacement: 'none',
                    },
                    elements: {
                        formButtonPrimary: "bg-gradient-to-r from-[#B900B4] to-[#F50000]",
                        card: 'bg-white/30 backdrop-blur-md',
                        headerSubtitle: 'hidden',
                    },
                }}
                signUpUrl='/sign-up'
                afterSignInUrl='/'
                afterSignUpUrl='/'
            />
        </AuthLayout>
    );
}