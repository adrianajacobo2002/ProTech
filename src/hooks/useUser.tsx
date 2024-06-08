import { create } from "zustand";

const store = create<TStore>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  deleteUser: () => set(() => ({ user: null })),
}));

export default function useUser() {
  return store((state) => state);
}

type TStore = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  deleteUser: () => void;
};
