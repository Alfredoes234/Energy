import type {
  ActionFunctionArgs,
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Verify } from "~/utils/cryptography.server";
import { commitSession, getSession } from "~/utils/session.server";
import { getUsers } from "~/utils/prisma.server";

export function Headers(mxg: number, smxg: number) {
  const headers: HeadersFunction = ({
    actionHeaders,
    errorHeaders,
    loaderHeaders,
    parentHeaders,
  }) => ({
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": `max-age=300, s-maxage=3600`,
  });
  return headers;
}

export const meta: MetaFunction = () => {
  return [{ title: "Remaux" }, { name: "description", content: "Login page" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const session = await getSession(request.headers.get("Cookie"));
    if (session.has("userId")) {
      // Redirect to the home page if they are already signed in.
      return redirect("/");
    }
  } catch (e: any) {
    return console.log(e);
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const email = String(form.get("email"));
  const userData = await getUsers(email);
  const parsed = JSON.parse(JSON.stringify(userData || "") || "");
  const password = String(form.get("password"));
  const passwordVerify = await Verify(password, parsed.password);

  if (parsed.email == undefined || passwordVerify == false) {
    const msg = "Invalid email and/or password";
    return json({
      error: {
        email: { _errors: [msg] },
        password: { _errors: [msg] },
      },
    });
  }
  const userId = { email, password };

  session.set("userId", String(userId));

  return redirect("/login", {
    headers: {
      "Set-Cookie": await commitSession(session),
      "Cache-Control": "public, max-age=30, s-maxage=86400",
    },
  });
}

export default function Login() {
  const data = useActionData<typeof action>();
  return (
    <div>
      <Form preventScrollReset method="POST" className="m-5">
        <div>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="  Email"
            required
            autoComplete="email"
            className="border-black ml-2 rounded border"
          />
          {data && data.error.email && (
            <p className="ml-2 text-red-600">{data.error.email._errors[0]}</p>
          )}
        </div>
        <br />
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="  Password"
            autoComplete="off"
            className="border-black m-2 rounded border"
          />
          {data && data.error.password && (
            <p className="ml-2 text-red-600">
              {data.error.password._errors[0]}
            </p>
          )}
        </div>
        <button type="submit" className="bg-cyan-400 m-2 rounded px-4 py-2">
          Login
        </button>
      </Form>
    </div>
  );
}
