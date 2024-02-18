import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

import { useState } from "react";

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDarkHeader, setIsDarkHeader] = useState(false);

    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsDarkHeader(true);
      } else {
        setIsDarkHeader(false);
      }
    });

    return (
      <>
        <div
          className="w-full py-4 px-10 w-full flex items-center justify-between fixed top-0 z-50"
          style={{
            background: isDarkHeader ? "rgba(12, 12, 12, 0.9)" : "transparent",
          }}
        >
          <div className="flex gap-4">
            {[
              {
                to: "/",
                children: "Home",
              },
              {
                to: "/movies",
                children: "Movies",
              },
              {
                to: "/series",
                children: "Series",
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

          <a
            href="/"
            className="text-white font-semibold shadow text-4xl text-[#781af3]"
            style={{
              background:
                "radial-gradient(circle, rgba(63,226,251,1) 0%, rgba(144,31,194,1) 92%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            M
          </a>
          {/* <div className="flex items-center gap-2">
            <div
              className="bg-black rounded-xl px-3 py-1"
              style={{
                background: !isDarkHeader
                  ? "rgba(12, 12, 12, 0.9)"
                  : "transparent",
              }}
            >
              <h2 className="text-white font-semibold text-2xl text-[#781af3] shadow">
                MOVIX
              </h2>
            </div>
            <img className="w-16 h-full object-cover" src="./movies-logo.png" />
          </div> */}
          {/* <img className="w-16 h-full object-cover" src="./movies-logo.png" /> */}
        </div>
        <Outlet />
        <div
          className="py-5 h-30 justify-end opacity-80 flex flex-col items-center gap-3"
          style={{
            background:
              "linear-gradient(to bottom, rgba(27, 27, 27, 0) 0%, #0e0e0e 60%)",
          }}
        >
          <div className="flex gap-1 items-center">
            {[
              {
                Icon: LinkedInIcon,
                link: "https://www.linkedin.com/in/nicol%C3%A1s-andreoli-546b2a209/",
              },
              {
                Icon: EmailIcon,
                link: "mailto:nicolasandreoli2000@gmail.com",
              },
              { Icon: GithubIcon, link: "https://github.com/nicoandreoli2000" },
            ].map(({ Icon, link }, i) => (
              <a
                key={`${i}-social-media`}
                href={link}
                className="hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                <Icon style={{ fontSize: 32 }} />
              </a>
            ))}
          </div>
          <p>Copyright © {new Date().getFullYear()}- Nicolás Andreoli</p>
        </div>
        {/* <TanStackRouterDevtools /> */}
      </>
    );
  },
});
