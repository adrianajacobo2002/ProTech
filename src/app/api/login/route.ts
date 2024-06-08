import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const credentials = await req.json();

  const loginRes = await fetch("http://localhost:5194/api/User/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!loginRes.ok) {
    return Response.json(
      {},
      {
        status: 404,
      }
    );
  }

  const user = await loginRes.json();
  cookies().set("user", JSON.stringify(user));

  return Response.json(user);
};
