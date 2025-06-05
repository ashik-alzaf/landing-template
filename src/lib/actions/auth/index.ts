"use server";
import { cookies } from "next/headers";
import { fetcher } from "../fetcher";

interface LoginResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}

export const handleLogin = async (data: any): Promise<LoginResponse> => {
  const res = await fetcher<LoginResponse>("/auth/login", "POST", data);
  if (res.accessToken) {
    const cookieStore: any = cookies();
    cookieStore.set("auth_token", res.accessToken);
  }
  return res;
};
 