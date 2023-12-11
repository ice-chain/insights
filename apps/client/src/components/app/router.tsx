import {
  Navigate,
  Outlet,
  RootRoute,
  Route,
  Router,
} from '@tanstack/react-router';
import { useAuth } from '@clerk/clerk-react';

import { RootComponent } from '@/components/app/RootComponent';
import { SignIn } from '@/components/pages/SignIn';
import { SignUp } from '@/components/pages/SignUp';
import { Home } from '@/components/pages/Home';
import { Dashboard } from '@/components/pages/Dashboard';
import { Account } from '@/components/pages/Account';

const rootRoute = new RootRoute({
  component: RootComponent,
});

const authenticatedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'authenticated-layout',
  component: function Auth() {
    const { isLoaded, isSignedIn } = useAuth();

    if(!isLoaded) {
      return 'LOADING>>>>';
    }

    return isSignedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/sign-in" />
    )
  },
})

const indexRoute = new Route({
  path: '/',
  getParentRoute: () => rootRoute,
  component: Home
})

const signInRoute = new Route({
  path: 'sign-in',
  getParentRoute: () => rootRoute,
  component: SignIn,
})

const signUpRoute = new Route({
  path: 'sign-up',
  getParentRoute: () => rootRoute,
  component: SignUp,
})

const dashboardRoute = new Route({
  path: 'dashboard',
  getParentRoute: () => authenticatedRoute,
  component: Dashboard,
});

const dashboardAccountRoute = new Route({
  path: 'dashboard/$id',
  getParentRoute: () => authenticatedRoute,
  component: Account,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  authenticatedRoute.addChildren([
    dashboardRoute,
    dashboardAccountRoute
  ]),
  signInRoute,
  signUpRoute,
])

export const router = new Router({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
      router: typeof router
  }
}