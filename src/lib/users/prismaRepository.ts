import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { DuplicateInitialsError, type User, type UserRepository } from "./types";

const UNIQUE_CONSTRAINT_VIOLATION = "P2002";

export const prismaUserRepository: UserRepository = {
  async findByInitials(initials: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { initials } });
  },

  async create(initials: string, pinHash: string): Promise<User> {
    try {
      return await prisma.user.create({ data: { initials, pinHash } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === UNIQUE_CONSTRAINT_VIOLATION
      ) {
        throw new DuplicateInitialsError(initials);
      }
      throw error;
    }
  },
};
