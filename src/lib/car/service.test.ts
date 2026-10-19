import { describe, expect, it } from "vitest";
import { createCorrectiveAction, listCorrectiveActions } from "./service";
import { createFakeCorrectiveActionRepository } from "./testing/fakeRepository";

describe("createCorrectiveAction", () => {
  it("rejects creation when title is missing", async () => {
    const repository = createFakeCorrectiveActionRepository();

    const result = await createCorrectiveAction(repository, {
      title: "",
      summary: null,
      sourceType: "other",
      ncrReference: "NCR-1",
      reportedBy: null,
      supplierInvolved: false,
    });

    expect(result).toEqual({ ok: false, error: "MISSING_TITLE" });
  });

  it("rejects creation when NCR reference is missing", async () => {
    const repository = createFakeCorrectiveActionRepository();

    const result = await createCorrectiveAction(repository, {
      title: "Loose rivet on bracket assembly",
      summary: null,
      sourceType: "other",
      ncrReference: "",
      reportedBy: null,
      supplierInvolved: false,
    });

    expect(result).toEqual({ ok: false, error: "MISSING_NCR_REFERENCE" });
  });

  it("creates a Corrective Action with status open and currentStep intake", async () => {
    const repository = createFakeCorrectiveActionRepository();

    const result = await createCorrectiveAction(repository, {
      title: "Loose rivet on bracket assembly",
      summary: "Found during receiving inspection",
      sourceType: "incoming_qc",
      ncrReference: "NCR-4821",
      reportedBy: "JR",
      supplierInvolved: true,
    });

    expect(result).toEqual({
      ok: true,
      correctiveAction: {
        id: expect.any(String),
        title: "Loose rivet on bracket assembly",
        summary: "Found during receiving inspection",
        sourceType: "incoming_qc",
        ncrReference: "NCR-4821",
        reportedBy: "JR",
        supplierInvolved: true,
        status: "open",
        currentStep: "intake",
      },
    });
  });
});

describe("listCorrectiveActions", () => {
  it("returns Corrective Actions that have been created", async () => {
    const repository = createFakeCorrectiveActionRepository();
    await createCorrectiveAction(repository, {
      title: "Loose rivet on bracket assembly",
      summary: null,
      sourceType: "incoming_qc",
      ncrReference: "NCR-4821",
      reportedBy: null,
      supplierInvolved: false,
    });

    const correctiveActions = await listCorrectiveActions(repository);

    expect(correctiveActions).toHaveLength(1);
    expect(correctiveActions[0]).toMatchObject({ title: "Loose rivet on bracket assembly" });
  });
});
