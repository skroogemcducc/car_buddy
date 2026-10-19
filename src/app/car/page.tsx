import Link from "next/link";
import { listCorrectiveActions } from "@/lib/car/service";
import { prismaCorrectiveActionRepository } from "@/lib/car/prismaRepository";

export default async function CorrectiveActionListPage() {
  const correctiveActions = await listCorrectiveActions(prismaCorrectiveActionRepository);

  return (
    <main>
      <h1>Corrective Actions</h1>
      <p>
        <Link href="/car/new">New Corrective Action</Link>
      </p>
      {correctiveActions.length === 0 ? (
        <p>No corrective actions yet.</p>
      ) : (
        <ul>
          {correctiveActions.map((correctiveAction) => (
            <li key={correctiveAction.id}>
              {correctiveAction.title} — {correctiveAction.ncrReference} ({correctiveAction.status})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
