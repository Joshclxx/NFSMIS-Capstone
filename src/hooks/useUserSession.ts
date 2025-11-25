import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type UserRole = "admin" | "student" | null;

type UserAccount = {
  userId: string | null;
  userRole: UserRole;
  userEmail: string | null;
  token: string | null;
  loggedIn: boolean;
  sessionTimestamp: number | null;
  setUser: (
    id: string,
    role: UserRole,
    email: string,
    timestamp: number
  ) => void;
  logout: () => void;
};

const INITIAL_STATE: Omit<UserAccount, "setUser" | "logout"> = {
  userId: null,
  userRole: null,
  userEmail: null,
  token: null,
  loggedIn: false,
  sessionTimestamp: null,
};

export const useUserSession = create<UserAccount>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setUser: (id, role, email, timestamp) =>
        set({
          userId: id,
          userRole: role,
          userEmail: email,
          loggedIn: true,
          sessionTimestamp: timestamp,
        }),

      logout: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "user-session",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
      version: 1,
    }
  )
);

export const useIsLoggedIn = () => useUserSession((s) => s.loggedIn);
export const useUserRole = () => useUserSession((s) => s.userRole);
export const useLogout = () => useUserSession((s) => s.logout);
