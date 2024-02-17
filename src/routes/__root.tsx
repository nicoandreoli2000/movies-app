import { Input } from "@/components/ui/input";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="flex w-full gap-4">
          {[
            {
              to: "/",
              children: "Home",
            },
            {
              to: "/series",
              children: "Series",
            },
            {
              to: "/movies",
              children: "Movies",
            },
          ].map(({ to, children }) => (
            <Link
              key={to}
              to={to}
              className="w-[50px] text-blue-100 [&.active]:text-blue-500"
            >
              {children}
            </Link>
          ))}
        </div>
        <Input className="w-60" placeholder="Search movies..." />
      </div>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
