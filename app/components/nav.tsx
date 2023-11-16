import { NavLink } from "@remix-run/react";

export default function Nav() {
  return (
    <nav className="flex justify-between text-2xl bg-gray-500 p-5">
      <h1>
        <NavLink to="/" prefetch="intent">
          Sustainable Slurp
        </NavLink>
      </h1>
      <div className="flex gap-5">
        {/* Burger menu here */}
        <NavLink to={"/login"} prefetch="intent">
          <h2>Login</h2>
        </NavLink>
        <NavLink to={"/signup"} prefetch="intent">
          <h2>Signup</h2>
        </NavLink>
      </div>
    </nav>
  );
}
