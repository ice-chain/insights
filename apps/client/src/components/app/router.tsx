import {
  Route,
  Router,
  RootRoute,
} from '@tanstack/react-router';

import { RootComponent } from '@/components/app/RootComponent';
import { SignInPage } from '@/components/pages/SignInPage';
import { SignUpPage } from '@/components/pages/SignUpPage';
import { HomePage } from '@/components/pages/HomePage';

const rootRoute = new RootRoute({
  component: RootComponent,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage
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