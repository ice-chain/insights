import { AuthLayout } from '@/components/shared/AuthLayout';
import { SignUp as SignUpClerk } from '@clerk/clerk-react';

export function SignUp() {
    return (
        <AuthLayout>
            <SignUpClerk
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
                signInUrl='/sign-in'
                afterSignInUrl='/'
                afterSignUpUrl='/'
            />
        </AuthLayout>
    );
}