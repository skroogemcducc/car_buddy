# CAR (Corrective Action Record)

A standalone QA workspace for running issues through Stafast's corrective action process once they've been escalated beyond an NCR. It exists to make documenting and closing out a corrective action fast and simple for a busy QA worker, instead of the heavy, field-dense corrective action software typical of QMS tools.

## Language

**NCR**:
A Non-Conformance Report, created and tracked in Stafast's D365 environment. It's the trigger point for any quality issue — every Corrective Action originates from an NCR, but most NCRs are resolved on their own and never become one.
_Avoid_: Corrective Action, Report (when referring to the CAR entity)

**Corrective Action (CAR)**:
The core record in this app. Created by "elevating" an NCR that's serious enough to require formal root-cause work with a vendor or an internal process — not every NCR becomes one. At creation, relevant NCR reference points (NCR number, part number, dates, etc.) are copied in manually; there's no live link or sync back to D365.
_Avoid_: NCR, Report, Ticket

**Source Type**:
The fixed classification of where a Corrective Action originated: Customer Complaint (a sales issue), Incoming QC (found in-house, e.g. during receiving inspection), Audit Finding (found during an audit), or Other.

**Wizard Step**:
One of the fixed, ordered stages a Corrective Action moves through: Intake, Containment, Root Cause, Corrective Action, Verification, Close. The sequence cannot be reordered or customized per record.

**Containment**:
The wizard step documenting what's being done to stop the non-conformance from spreading — including whether every potentially affected batch, lot, or site has been checked.

**Supplier Involved**:
A flag set on a Corrective Action indicating a vendor is party to the issue. When set, both the Corrective Action and Verification steps show an additional section for the supplier's side, separate from Stafast's own.

**Root Cause**:
The wizard step documenting the underlying cause of the issue, identified via 5 Whys — a short chain of "why" questions (up to 5, only the first required) that pushes past the first symptom to the real cause.

**5 Whys**:
The root-cause technique used in the Root Cause step: asking "why" repeatedly against an issue until the underlying cause, not just its symptom, is reached.

**8D**:
An 8-discipline corrective action report format some customers require. Distinct from CAR's own process — not built into the app in v1; a CAR may later be reformatted into an 8D document as a customer deliverable, but 8D is not one of CAR's wizard steps.

**Verification**:
The wizard step confirming the corrective action actually worked before a Corrective Action can be closed. When Supplier Involved is set, this step holds two separate sections: the supplier's own verification evidence (entered by Stafast QA on the supplier's behalf — the supplier has no direct access to CAR) and Stafast's own verification once parts arrive. Both must clear for the Corrective Action to be considered successful.

**Reopen Reason**:
A required short note explaining why a Closed Corrective Action is being reopened. Exists to preserve an audit trail; reopening itself is never blocked.
