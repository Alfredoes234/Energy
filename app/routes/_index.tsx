import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sustainable Slurp" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="m-12 w-auto">
      <div className="flex justify-between  mt-6">
        <div className="mt-52">
          <h3 className="text-8xl font-bold">Big text</h3>
          <div className="mt-12 h-16 w-64">
            <p className="break-words w-auto">
              Lorem ipsum dolor sit amet consectetur. Fames parturient sit nunc
              leo parturient lorem aliquam. Euismod tincidunt odio maecenas
              massa. Turpis tellus sit elementum tristique id donec. Non
              venenatis tellus netus mi euismod malesuada lobortis.
            </p>
            <div className="flex md:flex-none gap-16 mt-12">
              <div>
                <Link
                  to="/products"
                  className="w-16 h-10 px-12 py-4 bg-blue-400 rounded-xl text-lg"
                  prefetch="intent"
                >
                  Shop
                </Link>
              </div>
              <div>
                <Link
                  to="/contact"
                  className="w-16 h-10 px-12 py-4 bg-emerald-400 rounded-xl text-lg"
                  prefetch="intent"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <img
            className="h-[700px] w-[629px]"
            src="/rectangle.webp"
            alt="rectangle"
          />
        </div>
      </div>
      <div className="mt-16">
        <div className="flex justify-center items-center inset-0 h-[350px] w-[380px] bg-slate-400 rounded ">
          <div className="flex-none">
            {/* Image goes here */}
            <p>bruh</p>
          </div>
          <p>Text</p>
        </div>
      </div>
    </main>
  );
}
