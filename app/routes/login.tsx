import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Verify } from "~/utils/cryptography.server";
import { getUsers } from "~/utils/prisma.server";
import { getSession, commitSession } from "~/utils/session.server";

export async function loader({
    request,
}: LoaderFunctionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        // Redirect to the home page if they are already signed in.
        return redirect("/");
    }

    const data = { error: session.get("error") };

    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}

export async function action({
    request,
}: ActionFunctionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const form = await request.formData();
    const email = String(form.get("email"));
    const userData = await getUsers(email);
    const parsed = JSON.parse(JSON.stringify(userData || '') || '');
    const password = String(form.get("password"));
    const passwordVerify = await Verify(password, parsed.password);

    if (parsed.email == undefined || passwordVerify == false) {
        session.flash("error", "Invalid username/password");
        const msg = 'Invalid email and/or password'
        return json({
            error: {
                email: { _errors: [msg] },
                password: { _errors: [msg] }
            }
        },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        })
    }

    session.set("userId", email);

    return redirect("/login", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}


export default function Login() {
    const { currentUser, error } =
        useLoaderData<typeof loader>();
    const data = useActionData<typeof action>();
    return (
        <div>
            {error ? <div className="error">{error}</div> : null}
            {currentUser ? <div>{currentUser}</div> : null}
            <Form preventScrollReset method="POST" className="m-5">
                <div>
                    <input type="email" name="email" id="email" placeholder="  Email" required className="border-black ml-2 rounded border" />
                    {data && data.error.email && <p className="ml-2 text-red-600">{data.error.email._errors[0]}</p>}
                </div>
                <br />
                <div>
                    <input type="password" name="password" id="password" placeholder="  Password" className="border-black m-2 rounded border" />
                    {data && data.error.password && <p className="ml-2 text-red-600">{data.error.password._errors[0]}</p>}
                </div>
                <button type="submit" className="bg-cyan-400 m-2 rounded px-4 py-2">Login</button>
            </Form>
        </div>
    )
}