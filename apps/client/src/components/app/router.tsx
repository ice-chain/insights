import {
  Route,
  Router,
  RootRoute,
} from '@tanstack/react-router';

import { RootComponent } from '@/components/app/RootComponent';
import { SignIn } from '@/components/pages/SignIn';
import { SignUp } from '@/components/pages/SignUp';
import { Home } from '@/components/pages/Home';
import { Dashboard } from '@/components/pages/Dashboard';

const rootRoute = new RootRoute({
  component: RootComponent,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard/$id',
  component: Dashboard
})

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: SignIn,
})

const signUpRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: SignUp,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
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