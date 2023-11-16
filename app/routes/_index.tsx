import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sustainable Slurp" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="m-5">
      <p className="text-4xl font-bold">Bruh</p>
      <textarea className="resize-none border rounded border-black" rows={10} cols={75}></textarea>
    </main>
  );
}
