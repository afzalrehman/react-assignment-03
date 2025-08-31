import type { User } from "@/types/auth";

const LIVE_URL = "https://student-api.muhammadafzal.com";

export const AuthApi = {
  login: async (User: Pick<User, "email" | "password">) => {
    const response = await fetch(`${LIVE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });
    return response.json();
  },

  register: async (User: User & { password_confirmation: string }) => {
    const response = await fetch(`${LIVE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });
    return response.json();
  },
};
