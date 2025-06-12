"use server";

import { cookies } from "next/headers";

export async function fetcher<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  const token = (await cookies()).get("auth_token")?.value;
  
  const url = `${process.env.API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong during fetch");
  }
}
