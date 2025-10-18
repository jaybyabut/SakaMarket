# SakaMarket — START-up Hackathon Entry

SakaMarket is a mobile-friendly marketplace (React frontend, PHP backend, PostgreSQL) and this repository is submitted as an entry to the START-up Hackathon. The project aims to reduce Filipino farmers' reliance on middlemen by increasing price transparency, traceability, and trust. While SakaMarket is not a public blockchain, it intentionally imitates several blockchain properties — such as immutability, auditability, and transparency — using practical and deployable techniques to demonstrate an accessible, high-impact solution at the Hackathon.

Hackathon submission notes
- Purpose: Demonstrate a practical, farmer-first marketplace that provides tamper-evident records and transparent pricing to improve farmer incomes.
- Team / Contributors: @QyDrei, @Heysti, @KyleMasinas, @KaceyPidazo, @jaybyabut
- Deliverables: working frontend + backend, and example seeded data

About
- Many smallholder farmers in the Philippines rely on middlemen who take large cuts of profit and reduce price transparency.
- SakaMarket connects farmers and buyers directly, giving farmers greater control and clearer records of transactions.
- The system focuses on being simple, auditable, and practical to deploy in resource-constrained environments.

Key principles
- Farmer-first: reduce friction for listing produce, negotiating, and receiving payment information.
- Transparent pricing & audit trails: buyers and farmers can see full, tamper-evident transaction records.
- Practical immutability: records are stored and managed to be append-only and verifiable, even without a distributed ledger.
- Minimal tech barrier: web-first React UI and a lightweight PHP backend make deployment easier for small teams.


Architecture overview
- Frontend: React (single-page app) — may be used with React Native or Expo for mobile builds.
- Backend: PHP (REST API) — handles business logic, events, hashing, and append-only storage pattern.
- Database: PostgreSQL — primary data store. Append-only tables and event logs implemented here.

How SakaMarket imitates blockchain properties
- Immutability (practical):
  - Append-only Events table: every state change is recorded as a new event row rather than overwriting existing rows.
  - Database triggers or application controls discourage or forbid updates/deletes to event rows in normal operation.
- Verifiability:
  - Critical events include a hash of event payload and previous event hash (simple chaining) to make tampering detectable.
- Transparency:
  - Read-only audit endpoints expose sanitized, aggregated event logs.
- Limitations:
  - Trust still depends on the platform operator; cryptographic proofs help detect tampering but don't distribute trust across independent validators.

Tech stack
- Frontend: React, React Router, Axios (or fetch)
- Backend: PHP 7.4+ or PHP 8.x, Composer
- Database: PostgreSQL 11+

Acknowledgements
- Inspired by projects that increase farmer incomes and promote transparent market access.
- This project uses hashing techniques and append-only patterns to provide stronger auditability; it is not a substitute for a distributed, public blockchain but serves similar user goals in a more accessible architecture.

Thank you for checking out SakaMarket — a practical step toward fairer, more transparent agricultural markets in the Philippines. This README has been updated to reflect the project's role as a START-up Hackathon submission.
