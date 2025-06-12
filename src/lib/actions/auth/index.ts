// "use server";
// import { cookies } from "next/headers";
// import { fetcher } from "../fetcher";

// interface LoginResponse {
//   token?: string;
//   message?: string;
//   [key: string]: any;
// }

// export const handleLogin = async (data: any): Promise<LoginResponse> => {
//   const res = await fetcher<LoginResponse>("/auth/login", "POST", data);
//   if (res.accessToken) {
//     const cookieStore: any = cookies();
//     cookieStore.set("auth_token", res.accessToken);
//   }
//   return res;
// };

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
      path: "/", // optional, makes it accessible across your app
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // optional: 1 week
    });
  }

  return res;
};

export const refreshToken = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: "",
    }),
    credentials: "include",
  });
};
