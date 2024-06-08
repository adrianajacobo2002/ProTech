import { API_URL } from "@/utils/consts";

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

export const logout = async () => {
  const fetchRes = await fetch("/api/logout", {
    method: "POST",
  });

  return fetchRes.ok;
};

export const changePassword = async (userId: number, newPassword: string) => {
  const fetchRes = await fetch(
    `${API_URL}/User/ChangePassword?userId=${userId}&password=${newPassword}`,
    {
      method: "PUT",
    }
  );

  return fetchRes.ok;
};
