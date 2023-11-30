import {
  Outlet,
  RouterProvider,
  Route,
  Router,
  RootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

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
  component: () => {
    return (
      <div className="p-2">
        <h3>Sing in!</h3>
      </div>
    )
  },
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
