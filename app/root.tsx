import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/global.css";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/pwa/manifest.json"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <div className="flex justify-between m-5 text-2xl">
            <h1 ><NavLink to="/">Sustainable Slurp</NavLink></h1>
            <div className="flex gap-5">
              <h1><NavLink to="">Link 1</NavLink></h1>
              <h1><NavLink to="">Link 2</NavLink></h1>
            </div>
          </div>
        </nav>
        <Outlet />
        <footer>

        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
