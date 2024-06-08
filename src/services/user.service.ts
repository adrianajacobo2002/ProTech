export const login = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const user = (await res.json()) as TUser;
  return user;
};
