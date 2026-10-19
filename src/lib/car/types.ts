export type SourceType = "customer_complaint" | "incoming_qc" | "audit_finding" | "other";

export type CorrectiveAction = {
  id: string;
  title: string;
  summary: string | null;
  sourceType: SourceType;
  ncrReference: string;
  reportedBy: string | null;
  supplierInvolved: boolean;
  status: "open";
  currentStep: "intake";
};

export interface CorrectiveActionRepository {
  create(input: {
    title: string;
    summary: string | null;
    sourceType: SourceType;
    ncrReference: string;
    reportedBy: string | null;
    supplierInvolved: boolean;
  }): Promise<CorrectiveAction>;
  list(): Promise<CorrectiveAction[]>;
}
