import { prisma } from "@/lib/db/prisma";
import type { CorrectiveAction, CorrectiveActionRepository, SourceType } from "./types";

function toCorrectiveAction(record: { sourceType: string }): CorrectiveAction {
  return { ...record, sourceType: record.sourceType as SourceType } as CorrectiveAction;
}

export const prismaCorrectiveActionRepository: CorrectiveActionRepository = {
  async create(input): Promise<CorrectiveAction> {
    const record = await prisma.correctiveAction.create({ data: input });
    return toCorrectiveAction(record);
  },

  async list(): Promise<CorrectiveAction[]> {
    const records = await prisma.correctiveAction.findMany({ orderBy: { createdAt: "desc" } });
    return records.map(toCorrectiveAction);
  },
};
