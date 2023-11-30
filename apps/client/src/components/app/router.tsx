import React from 'react';
import {
    Outlet,
    Route,
    RootRoute,
    Router,
  } from '@tanstack/react-router';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() => // Lazy load in development
    import('@tanstack/router-devtools').then((res) => ({
      default: res.TanStackRouterDevtools,
    })),
  )

const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </>
    )
  },
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    return (
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const signInRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/sign-in',
    component: SignInPage,
})

const signUpRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/sign-up',
    component: SignUpPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
])

export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}