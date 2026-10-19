import { describe, expect, it } from "vitest";
import { registerUser, authenticateUser } from "./service";
import { createFakeUserRepository } from "./testing/fakeRepository";
import { DuplicateInitialsError, type UserRepository } from "./types";

describe("registerUser", () => {
  it("rejects registering with initials that are already taken", async () => {
    const repository = createFakeUserRepository();
    await registerUser(repository, "AB", "1234");

    const result = await registerUser(repository, "AB", "5678");

    expect(result).toEqual({ ok: false, error: "DUPLICATE_INITIALS" });
  });

  it("allows registering with initials that are not taken", async () => {
    const repository = createFakeUserRepository();

    const result = await registerUser(repository, "AB", "1234");

    expect(result.ok).toBe(true);
  });

  it("rejects a duplicate that only surfaces at the repository write (TOCTOU race)", async () => {
    const repository: UserRepository = {
      findByInitials: async () => null, // pre-check sees no conflict
      create: async () => {
        throw new DuplicateInitialsError("AB"); // but another registration won the race
      },
    };

    const result = await registerUser(repository, "AB", "1234");

    expect(result).toEqual({ ok: false, error: "DUPLICATE_INITIALS" });
  });
});

describe("authenticateUser", () => {
  it("succeeds with the correct PIN", async () => {
    const repository = createFakeUserRepository();
    await registerUser(repository, "AB", "1234");

    const result = await authenticateUser(repository, "AB", "1234");

    expect(result.ok).toBe(true);
  });

  it("rejects an incorrect PIN", async () => {
    const repository = createFakeUserRepository();
    await registerUser(repository, "AB", "1234");

    const result = await authenticateUser(repository, "AB", "0000");

    expect(result).toEqual({ ok: false, error: "INVALID_CREDENTIALS" });
  });
});
