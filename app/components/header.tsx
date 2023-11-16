import { NavLink } from "@remix-run/react";

export default function Header() {
    return(
        <nav className="flex justify-between text-2xl bg-gray-500 p-5">
            <h1 ><NavLink to="/">Sustainable Slurp</NavLink></h1>
            <div>
                {/* Burger menu here */}
            </div>
        </nav>
    )
}