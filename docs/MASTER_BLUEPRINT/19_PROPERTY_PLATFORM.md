# Property Platform

## Purpose

The Property Platform is an installable module for real estate inventory and
transactions. It is the domain foundation for LeadEstate AI while remaining
independent from the AtlasOS operating core.

## Domain scope

- developments, buildings, units, land, and resale listings
- owners, developers, brokers, and listing agreements
- location, geography, amenities, specifications, and media
- pricing, currencies, fees, commissions, and payment plans
- availability, holds, reservations, status history, and inventory feeds
- viewings, offers, documents, approvals, and transaction milestones
- comparable properties and governed matching attributes

## Inventory integrity

Availability and pricing have sources, effective times, freshness, and history.
Conflicting updates are resolved through explicit source precedence and
concurrency policy. Holds and reservations use transactional invariants and
expiry.

## Search and matching

Search supports structured filters, geography, natural-language assistance, and
permission-aware visibility. Matching produces explainable results from
requirements, inventory state, policy, and preferences; commercial sponsorship
must be disclosed and cannot silently distort relevance.

## Media and documents

Assets carry ownership, rights, classification, variants, accessibility
metadata, approval state, and usage references. Confidential documents remain
private and use time-bound authorized access.

## Permissions

Access distinguishes listing visibility, price fields, owner information,
commissions, internal notes, publication, holds, offers, exports, and bulk
changes. Scope may follow organization hierarchy, team, listing owner, or
portfolio.

## Integrations

The module integrates through contracts with CRM, messaging, calendar,
documents, analytics, billing, portals, syndication feeds, and automation. Each
integration declares source of truth and conflict behavior.

## Operational measures

Measures include inventory freshness, listing completeness, enquiry-to-viewing
conversion, viewing outcomes, days on market, reservation conversion, feed
failures, matching quality, and transaction cycle time.
