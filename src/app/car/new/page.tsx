"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCorrectiveActionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [sourceType, setSourceType] = useState("customer_complaint");
  const [ncrReference, setNcrReference] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [supplierInvolved, setSupplierInvolved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const response = await fetch("/api/car", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary: summary || null,
        sourceType,
        ncrReference,
        reportedBy: reportedBy || null,
        supplierInvolved,
      }),
    });

    setSubmitting(false);

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Could not create Corrective Action.");
      return;
    }

    router.push("/car");
    router.refresh();
  }

  return (
    <main>
      <h1>New Corrective Action</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title / summary
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Details
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
        </label>
        <label>
          Source type
          <select value={sourceType} onChange={(e) => setSourceType(e.target.value)}>
            <option value="customer_complaint">Customer Complaint</option>
            <option value="incoming_qc">Incoming QC</option>
            <option value="audit_finding">Audit Finding</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          NCR reference number
          <input
            value={ncrReference}
            onChange={(e) => setNcrReference(e.target.value)}
            required
          />
        </label>
        <label>
          Reported by
          <input value={reportedBy} onChange={(e) => setReportedBy(e.target.value)} />
        </label>
        <label>
          <input
            type="checkbox"
            checked={supplierInvolved}
            onChange={(e) => setSupplierInvolved(e.target.checked)}
          />
          Supplier Involved
        </label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          Create
        </button>
      </form>
    </main>
  );
}
