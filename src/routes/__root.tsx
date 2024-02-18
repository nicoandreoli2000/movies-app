import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [headerColor, setHeaderColor] = useState("transparent");

    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setHeaderColor("rgba(12, 12, 12, 0.9)");
      } else {
        setHeaderColor("transparent");
      }
    });

    return (
      <>
        <div
          className="w-full py-4 px-10 w-full flex items-center justify-between fixed top-0 z-50"
          style={{ background: headerColor }}
        >
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
            ].map(({ to, children }) => (
              <Link
                key={to}
                to={to}
                className="w-[50px] text-white font-semibold opacity-85"
              >
                {children}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-white font-semibold text-2xl">TANFLIX</h2>
            <img className="w-16 h-full object-cover" src="./movies-logo.png" />
          </div>
        </div>
        <Outlet />
        <div className="py-5 opacity-80">
          Copyright © {new Date().getFullYear()}- Nicolás Andreoli
        </div>
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
});
