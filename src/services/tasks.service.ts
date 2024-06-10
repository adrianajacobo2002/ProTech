import { API_URL } from "@/utils/consts";

export const finishTask = async (taskId: number) => {
  try {
    const fetchRes = await fetch(
      `${API_URL}/Task/ChangeState?taskId=${taskId}&state=${true}`,
      {
        method: "PUT",
      }
    );

    return fetchRes.ok;
  } catch (error: any) {
    return false;
  }
};
