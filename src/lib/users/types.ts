export type User = {
  id: string;
  initials: string;
  pinHash: string;
};

export class DuplicateInitialsError extends Error {
  constructor(initials: string) {
    super(`Initials already registered: ${initials}`);
    this.name = "DuplicateInitialsError";
  }
}

export interface UserRepository {
  findByInitials(initials: string): Promise<User | null>;
  /** Throws DuplicateInitialsError if initials are already taken. */
  create(initials: string, pinHash: string): Promise<User>;
}
