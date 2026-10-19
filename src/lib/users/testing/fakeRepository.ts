import { DuplicateInitialsError, type User, type UserRepository } from "../types";

let nextId = 1;

export function createFakeUserRepository(): UserRepository {
  const usersByInitials = new Map<string, User>();

  return {
    async findByInitials(initials: string): Promise<User | null> {
      return usersByInitials.get(initials) ?? null;
    },

    async create(initials: string, pinHash: string): Promise<User> {
      if (usersByInitials.has(initials)) {
        throw new DuplicateInitialsError(initials);
      }
      const user: User = { id: String(nextId++), initials, pinHash };
      usersByInitials.set(initials, user);
      return user;
    },
  };
}
