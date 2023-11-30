import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { ClerkProvider } from "@/components/shared/ClerkProvider";

import { router } from './router';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

// const metadata = {
//   title: 'Insights',
//   description: 'Social media insights',
// };

function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <ClerkProvider publishableKey={clerkPubKey}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default App
