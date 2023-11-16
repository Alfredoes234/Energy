import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { getSession, destroySession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Remaux" }, { name: "description", content: "Logout" }];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutRoute() {
  return (
    <>
      <p>Are you sure you want to log out?</p>
      <Form method="post">
        <button type="submit">Logout</button>
      </Form>
      <Link to="/">Never mind</Link>
    </>
  );
}
