# Media Model

MediaAsset describes a stored binary without depending on storage technology. It owns MIME type, size, checksum, classification, processing state, and opaque storage reference. Variants represent thumbnails, transformed images, previews, or renditions. Collections provide ordered galleries.

Lifecycle: Pending → Available → Quarantined/Failed → Archived. Malware scanning, metadata extraction, rendition generation, retention, residency, consent, and rights are implementation policies.
