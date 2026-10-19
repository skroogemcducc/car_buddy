# Standalone app, no D365 integration in v1

CAR runs entirely outside of Stafast's D365 environment. When an NCR is elevated into a Corrective Action, reference data (NCR number, part number, dates, etc.) is copied in manually by the QA worker rather than pulled or synced automatically. This keeps v1 simple and avoids taking on D365 API integration work before the core wizard is proven useful. Integration remains a possible future direction, not a requirement.
