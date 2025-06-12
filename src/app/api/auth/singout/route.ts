import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  // Clear auth-related cookies
  (await cookieStore).delete("auth_token");
  (await cookieStore).delete("refresh_token");

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
