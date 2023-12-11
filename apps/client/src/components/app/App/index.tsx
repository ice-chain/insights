import { RouterProvider, RouterContext } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/app/ThemeProvider";
import { ClerkProvider } from "@/components/app/ClerkProvider";

import { router } from '../router';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <ClerkProvider publishableKey={clerkPubKey}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default App
