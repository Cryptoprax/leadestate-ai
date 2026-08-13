# Release 1.8.1 — Aurora Realty Group Organization & People

## Organization

Aurora Realty Group now has a versioned fictional people directory containing 39 profiles. The directory is local immutable product configuration. It does not create authentication users, team memberships, contacts, CRM records, or database rows. Every email uses the reserved `.example` domain and every phone number is visibly fictional.

## Executive team

The leadership inventory contains Ananya Rao (CEO), Vikram Mehta (COO), Mira Kapoor (Sales Director), Rohan Iyer (Marketing Director), Leena Nair (Operations Director), Arjun Shah (Finance Director), Kavya Menon (HR Director), and Dev Malhotra (Technology Director). Profiles include office, contact placeholders, biography, responsibilities, skills, experience, and reporting relationships.

## Departments and business units

People populate Executive, Sales, Marketing, Operations, Customer Success, Finance, HR, Legal, Technology, and Administration. Sales assignments span Residential, Commercial, Luxury, Investment, Rentals, and Land. Office assignments reference the stable Release 1.8.0 office identifiers.

## Reporting hierarchy

Ananya Rao is the single root. Directors and the COO report to the CEO according to operating responsibility. Managers report to directors, while specialists, executives, agents, and coordinators report to their respective managers. Relationships are immutable employee-ID references. Construction validates unique employees, missing managers, and circular ancestry.

## Organization chart

`AuroraOrganizationChart` produces reusable models for department, reporting, office, and business-unit views. Every node exposes its employee, manager, direct reports, and reporting depth. The model is presentation-neutral and performs no persistence.

`EmployeeCard` and `OrganizationChart` provide VDS-native reusable rendering. The Executive Home consumes only the compact `AuroraPeopleWorkspace` projection when Aurora is the active fallback blueprint. Existing authenticated organizations never receive Aurora profiles.

## People workspace states

Leadership and department heads are derived from the directory. Recent Joiners, Birthdays, and Announcements are intentionally empty. No dates, events, announcements, or activity were fabricated.

## Assets

Eight local SVG avatar placeholders are reused across the fictional directory. There are no downloaded photographs, remote image hosts, or external requests.

## Architecture boundary

The people module lives below `features/vayon/demo-workspace/people`. It contains contracts, immutable configuration, chart projection logic, and presentation components. It contains no Supabase client, repositories, mutations, external APIs, analytics, AI, properties, leads, deals, meetings, documents, or communications.
