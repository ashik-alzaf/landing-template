export async function fetcher<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<T> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong during fetch");
  }
}
