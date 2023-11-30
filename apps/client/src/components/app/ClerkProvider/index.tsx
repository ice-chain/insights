import {
  ClerkProvider as ClerkProviderBase,
  ClerkProviderProps as ClerkProviderBaseProps
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Theme } from "@/components/app/ThemeProvider";

type ClerkProviderProps = ClerkProviderBaseProps & {
  theme?: Theme
}

export function ClerkProvider({
  theme,
  ...props
}: ClerkProviderProps) {

  return (
    <ClerkProviderBase
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        ...props.appearance,
      }}
      {...props}
    />
  )
}

