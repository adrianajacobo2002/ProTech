import { API_URL } from "@/utils/consts";

export const createTicket = async (fd: FormData) => {
  const fetchRes = await fetch(`${API_URL}/Ticket/createTicket`, {
    method: "POST",
    body: fd,
  });

  return fetchRes.ok;
};
