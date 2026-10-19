import { hashPin, verifyPin } from "./pin";
import { DuplicateInitialsError, type User, type UserRepository } from "./types";

const PIN_PATTERN = /^\d{4,8}$/;

export type RegisterResult =
  | { ok: true; user: User }
  | { ok: false; error: "DUPLICATE_INITIALS" | "INVALID_INITIALS" | "INVALID_PIN" };

export type LoginResult =
  | { ok: true; user: User }
  | { ok: false; error: "INVALID_CREDENTIALS" };

function normalizeInitials(initials: string): string {
  return initials.trim().toUpperCase();
}

export async function registerUser(
  repository: UserRepository,
  initials: string,
  pin: string
): Promise<RegisterResult> {
  const normalizedInitials = normalizeInitials(initials);

  if (normalizedInitials.length === 0) {
    return { ok: false, error: "INVALID_INITIALS" };
  }

  if (!PIN_PATTERN.test(pin)) {
    return { ok: false, error: "INVALID_PIN" };
  }

  const existing = await repository.findByInitials(normalizedInitials);
  if (existing) {
    return { ok: false, error: "DUPLICATE_INITIALS" };
  }

  const pinHash = await hashPin(pin);
  try {
    const user = await repository.create(normalizedInitials, pinHash);
    return { ok: true, user };
  } catch (error) {
    if (error instanceof DuplicateInitialsError) {
      return { ok: false, error: "DUPLICATE_INITIALS" };
    }
    throw error;
  }
}

export async function authenticateUser(
  repository: UserRepository,
  initials: string,
  pin: string
): Promise<LoginResult> {
  const normalizedInitials = normalizeInitials(initials);

  const user = await repository.findByInitials(normalizedInitials);
  if (!user) {
    return { ok: false, error: "INVALID_CREDENTIALS" };
  }

  const pinMatches = await verifyPin(pin, user.pinHash);
  if (!pinMatches) {
    return { ok: false, error: "INVALID_CREDENTIALS" };
  }

  return { ok: true, user };
}
