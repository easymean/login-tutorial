import { User } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: User | null;
  set: (payload: User) => void;
  clear: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  set: (payload) => set(() => ({ user: payload })),
  clear: () => set(() => ({ user: null })),
}));

export { useUserStore };
