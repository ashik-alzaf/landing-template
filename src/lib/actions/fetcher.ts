"use server";

import { cookies } from "next/headers";

export async function fetcher<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  values?: any
): Promise<T> {
  const url = `${process.env.API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });
    const data = await response.json();
    if (data.accessToken) {
      cookies().set("auth_token", data.accessToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong during fetch");
  }
}


  
