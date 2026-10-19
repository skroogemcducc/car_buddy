import type { CorrectiveAction, CorrectiveActionRepository } from "../types";

let nextId = 1;

export function createFakeCorrectiveActionRepository(): CorrectiveActionRepository {
  const correctiveActions: CorrectiveAction[] = [];

  return {
    async create(input): Promise<CorrectiveAction> {
      const correctiveAction: CorrectiveAction = {
        id: String(nextId++),
        status: "open",
        currentStep: "intake",
        ...input,
      };
      correctiveActions.unshift(correctiveAction);
      return correctiveAction;
    },

    async list(): Promise<CorrectiveAction[]> {
      return [...correctiveActions];
    },
  };
}
