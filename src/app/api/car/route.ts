import { NextResponse } from "next/server";
import { createCorrectiveAction, listCorrectiveActions } from "@/lib/car/service";
import { prismaCorrectiveActionRepository } from "@/lib/car/prismaRepository";
import type { SourceType } from "@/lib/car/types";

const SOURCE_TYPES: SourceType[] = ["customer_complaint", "incoming_qc", "audit_finding", "other"];

const ERROR_MESSAGES: Record<string, string> = {
  MISSING_TITLE: "Title is required.",
  MISSING_NCR_REFERENCE: "NCR reference is required.",
};

export async function GET() {
  const correctiveActions = await listCorrectiveActions(prismaCorrectiveActionRepository);
  return NextResponse.json({ correctiveActions });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { title, summary, sourceType, ncrReference, reportedBy, supplierInvolved } = body as {
    title?: string;
    summary?: string | null;
    sourceType?: string;
    ncrReference?: string;
    reportedBy?: string | null;
    supplierInvolved?: boolean;
  };

  if (
    typeof title !== "string" ||
    typeof ncrReference !== "string" ||
    typeof sourceType !== "string" ||
    !SOURCE_TYPES.includes(sourceType as SourceType)
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await createCorrectiveAction(prismaCorrectiveActionRepository, {
    title,
    summary: summary ?? null,
    sourceType: sourceType as SourceType,
    ncrReference,
    reportedBy: reportedBy ?? null,
    supplierInvolved: Boolean(supplierInvolved),
  });

  if (!result.ok) {
    return NextResponse.json({ error: ERROR_MESSAGES[result.error] }, { status: 400 });
  }

  return NextResponse.json({ correctiveAction: result.correctiveAction }, { status: 201 });
}
