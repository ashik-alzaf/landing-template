"use server";

import { cookies } from "next/headers";
import { fetcher } from "../fetcher";

interface LoginResponse {
  accessToken?: string;
  message?: string;
  [key: string]: any;
}

export const handleLogin = async (data: any): Promise<LoginResponse> => {
  const res = await fetcher<LoginResponse>("/auth/login", "POST", data);

  if (res.accessToken) {
    (await cookies()).set({
      name: "auth_token",
      value: res.accessToken,
      httpOnly: true,
      path: "/",
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // optional: 1 week
    });
  }

  return res;
};



