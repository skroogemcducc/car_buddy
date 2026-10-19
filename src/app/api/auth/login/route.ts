import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/users/service";
import { prismaUserRepository } from "@/lib/users/prismaRepository";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json();
  const { initials, pin } = body as { initials?: string; pin?: string };

  if (typeof initials !== "string" || typeof pin !== "string") {
    return NextResponse.json({ error: "Initials and PIN are required." }, { status: 400 });
  }

  const result = await authenticateUser(prismaUserRepository, initials, pin);

  if (!result.ok) {
    return NextResponse.json({ error: "Incorrect initials or PIN." }, { status: 401 });
  }

  const token = await createSessionToken({
    userId: result.user.id,
    initials: result.user.initials,
  });

  const response = NextResponse.json({ initials: result.user.initials });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
