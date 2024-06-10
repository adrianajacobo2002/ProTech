import { TUser } from "@/utils/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const store = create<TStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      deleteUser: () => set(() => ({ user: null })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default function useUser() {
  return store((state) => state);
}

type TStore = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  deleteUser: () => void;
};
