import type { CorrectiveAction, CorrectiveActionRepository, SourceType } from "./types";

export type CreateCorrectiveActionInput = {
  title: string;
  summary: string | null;
  sourceType: SourceType;
  ncrReference: string;
  reportedBy: string | null;
  supplierInvolved: boolean;
};

export type CreateCorrectiveActionResult =
  | { ok: true; correctiveAction: CorrectiveAction }
  | { ok: false; error: "MISSING_TITLE" | "MISSING_NCR_REFERENCE" };

export async function createCorrectiveAction(
  repository: CorrectiveActionRepository,
  input: CreateCorrectiveActionInput
): Promise<CreateCorrectiveActionResult> {
  if (input.title.trim().length === 0) {
    return { ok: false, error: "MISSING_TITLE" };
  }

  if (input.ncrReference.trim().length === 0) {
    return { ok: false, error: "MISSING_NCR_REFERENCE" };
  }

  const correctiveAction = await repository.create(input);
  return { ok: true, correctiveAction };
}

export async function listCorrectiveActions(
  repository: CorrectiveActionRepository
): Promise<CorrectiveAction[]> {
  return repository.list();
}
