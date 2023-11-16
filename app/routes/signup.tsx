import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";
import { Prisma as pris } from "@prisma/client";
import { z } from "zod";
import { Form, useActionData } from "@remix-run/react";
import { Hash } from "~/utils/cryptography.server";
import { getSession } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Remaux" }, { name: "description", content: "Login page" }];
};

export const signupSchema = z.object({
  name: z.string().min(1).max(8).trim(),
  email: z.string().email().trim(),
  password: z.string().min(8).max(12).trim(),
});

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
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  // Validates it against the zod schema
  const result = await signupSchema.safeParseAsync(body);
  if (!result.success) {
    return json({ error: result.error.format() });
  }
  // Gets the validated password & proceeds to hash it
  result.data.password = await Hash(result.data.password);
  try {
    await prisma.user.create({
      data: result.data,
    });
  } catch (e: any) {
    if (e instanceof pris.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        // Replace console log with custom json error (try & reconstruct with same format as zod error)
        const mssg = "Email taken";
        return json({
          error: {
            name: { _errors: [] },
            email: { _errors: [mssg] },
            password: { _errors: [] },
          },
        });
      }
    }
  }
  return redirect("/login");
}

export default function Signup() {
  const data = useActionData<typeof action>();
  // Error complains that its not good with the return for message up above but it works
  return (
    <Form preventScrollReset method="POST" className="m-5">
      <div>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="  Name"
          autoComplete="name"
          className="border-black ml-2 rounded border"
        />
        {data && data.error.name && (
          <p className="ml-2 text-red-600">{data.error.name._errors[0]}</p>
        )}
      </div>
      <br />
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
          <p className="ml-2 text-red-600">{data.error.password._errors[0]}</p>
        )}
      </div>
      <button type="submit" className="bg-cyan-400 m-2 rounded px-4 py-2">
        Sign Up
      </button>
    </Form>
  );
}
