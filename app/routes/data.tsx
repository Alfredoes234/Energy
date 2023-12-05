import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Sustainable Slurp" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};


export const loader = async () => {
    const response = await fetch("http://localhost:8080/json");
    const data = await response.json();
    return data;
};

export default function Data() {
    const data = useLoaderData<typeof loader>();
    return (
        <main>
            <p className="text-4xl font-bold">Bruh</p>
            {[data].map((data: any) => (
                <p key={data.id}>{data.data}</p>
            ))}
        </main>
    );
}