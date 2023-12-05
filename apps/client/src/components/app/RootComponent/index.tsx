import React from 'react';
import { Outlet } from '@tanstack/react-router';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() => // Lazy load in development
    import('@tanstack/router-devtools').then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  );

export function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools />
    </>
  );
}
