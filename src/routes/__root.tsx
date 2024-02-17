import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full flex items-center justify-between">
        <div
          className="p-3 w-24"
          style={{
            background: "radial-gradient(closest-side, #FFFFFF, #242424)",
          }}
        >
          <img className="w-full h-full object-cover" src="./movies-logo.png" />
        </div>
        <div className="flex gap-4">
          {[
            {
              to: "/",
              children: "Home",
            },
            {
              to: "/search",
              children: "Search",
            },
            // {
            //   to: "/series",
            //   children: "Series",
            // },
            // {
            //   to: "/movies",
            //   children: "Movies",
            // },
          ].map(({ to, children }) => (
            <Link
              key={to}
              to={to}
              className="w-[50px] text-white font-semibold [&.active]:text-blue-500"
            >
              {children}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
