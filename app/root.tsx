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
        <link rel="manifest" href="/manifest.json"></link>
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="flex justify-between text-2xl bg-gray-500 p-5">
          <h1 ><NavLink to="/">Sustainable Slurp</NavLink></h1>
          <div>
            {/* Burger menu here */}
          </div>
        </nav>
        <Outlet />
        <footer className="flex justify-between bg-gray-500 p-5">
          <h5>Logo</h5>
          <div>
            <h5>T</h5>
            <h5>T</h5>
          </div>
          
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
