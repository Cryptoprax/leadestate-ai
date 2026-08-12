# Deal Model

Deal is the commercial transaction aggregate joining property, participants, offers, viewings, financial terms, pipeline state, closing, and commissions.

Deal *→1 Property; Deal 0→1 Lead; Deal 1→* Viewing; Deal 1→* Offer; Deal 1→* Commission; Deal *↔* Contact/Company through participant roles.

Lifecycle: Open → Negotiation → Reserved → Won, with Lost or Cancelled exits and reopen policy. Viewing lifecycle: Requested → Proposed → Confirmed → Completed, or Cancelled/NoShow/Rescheduled. Offer lifecycle is Draft → Submitted → Countered → Accepted/Rejected/Expired/Withdrawn. Closing facts and commission generation occur only after governed acceptance/closing events.
