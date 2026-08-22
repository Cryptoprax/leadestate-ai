import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");
test("AI campaign chat creates structured authoritative draft packs", () => {
  const service = read("features/vayon/creative-studio/growth.service.ts"),
    chat = read(
      "features/vayon/creative-studio/components/GrowthCampaignChat.tsx",
    );
  for (const value of [
    "Launch Aurora Heights",
    "Diwali campaign",
    "luxury NRI campaign",
    "Promote Tower B",
    "weekend open house campaign",
  ])
    assert.match(chat, new RegExp(value, "i"));
  for (const value of [
    "CreativeStudioService.production",
    "projectContext",
    "saveDraft",
    "create_growth_campaign_pack",
    "recommendationOnly",
    "livePublishing",
    "liveAdBuying",
    "liveWhatsAppSending",
  ])
    assert.match(service, new RegExp(value));
});
test("campaign pack covers print social video sales and website deliverables", () => {
  const domain = read("features/vayon/creative-studio/domain.ts");
  for (const value of [
    "Flyer",
    "Leaflet",
    "Poster",
    "Brochure",
    "QR Poster",
    "Standee",
    "Billboard",
    "Instagram Post",
    "Carousel",
    "Story",
    "Facebook Banner",
    "LinkedIn Banner",
    "WhatsApp Creative",
    "15 second Reel",
    "30 second Promo",
    "60 second Promo",
    "Property Slideshow",
    "Video Storyboard",
    "Sales Presentation Cover",
    "Quotation Cover",
    "Email Header",
    "Email Campaign",
    "SMS Copy",
    "WhatsApp Copy",
    "Landing Hero",
    "CTA Banner",
    "SEO Metadata",
    "Landing Page Copy",
  ])
    assert.match(domain, new RegExp(value));
});
test("landing sales video and export systems are explicit governed capabilities", () => {
  const source = read(
    "features/vayon/creative-studio/components/GrowthViews.tsx",
  );
  for (const value of [
    "Project Microsite",
    "Coming Soon Page",
    "Offer Page",
    "Booking Page",
    "Campaign Landing Page",
    "Construction Update Page",
    "Sales Brochure",
    "Project Factsheet",
    "Investor Deck",
    "NRI Presentation",
    "Channel Partner Kit",
    "Dealer Kit",
    "Sales Presentation",
    "Pricing Presentation",
    "Scene Timeline",
    "Shot List",
    "Motion Suggestions",
    "Transition Suggestions",
    "Voice-over Script",
    "Captions",
    "Thumbnail",
    "Music Suggestions",
    "MP4 rendering Preview",
    "PNG",
    "JPEG",
    "PDF",
    "Print PDF",
    "SVG placeholder",
    "Editable Project",
    "PowerPoint placeholder",
    "Campaign Package ZIP",
  ])
    assert.match(source, new RegExp(value));
});
test("Brand Guardian and creative review cover quality compliance and accessibility", () => {
  const domain = read("features/vayon/creative-studio/domain.ts"),
    service = read("features/vayon/creative-studio/growth.service.ts");
  for (const value of [
    "brandComplianceScore",
    "creativeQualityScore",
    "visualHierarchy",
    "contrast",
    "whitespace",
    "typography",
    "imageQuality",
    "ctaVisibility",
    "offerProminence",
    "audienceSuitability",
    "brandColors",
    "logoPlacement",
    "qrCode",
    "offerAccuracy",
    "projectInformation",
    "pricingConsistency",
    "legalDisclaimer",
    "reraInformation",
    "readability",
    "accessibility",
  ])
    assert.match(domain, new RegExp(value));
  assert.match(service, /suggestions/);
});
test("five variations and eight languages are supported", () => {
  const domain = read("features/vayon/creative-studio/domain.ts"),
    provider = read("features/vayon/creative-studio/providers.ts");
  for (const value of [
    "Version A",
    "Version B",
    "Version C",
    "Version D",
    "Version E",
  ])
    assert.match(provider, new RegExp(value));
  for (const language of [
    "English",
    "Hindi",
    "Arabic",
    "Thai",
    "Japanese",
    "Spanish",
    "German",
    "French",
  ])
    assert.match(domain, new RegExp(language));
});
test("future connectors are provider-neutral and disabled", () => {
  const contracts = read("features/vayon/creative-studio/contracts.ts"),
    providers = read("features/vayon/creative-studio/providers.ts");
  for (const value of [
    "Meta",
    "LinkedIn",
    "Google Ads",
    "YouTube",
    "WhatsApp",
    "Email",
  ])
    assert.match(contracts, new RegExp(value));
  assert.match(providers, /enabled=false/);
  assert.match(providers, /state:"future"/);
});
test("growth routes reuse production Marketing access and existing studio service", () => {
  for (const route of ["growth", "packs", "calendar"])
    assert.ok(existsSync(`app/vayon/creative-studio/${route}/page.tsx`));
  const service = read("features/vayon/creative-studio/growth.service.ts");
  assert.match(service, /creativeStudioAccess/);
  assert.match(service, /CreativeStudioService/);
});
test("migration enforces tenant RLS draft-only schedules audit and version E", () => {
  const sql = read(
    "supabase/migrations/20260913000000_sprint82_6_ai_growth_studio.sql",
  );
  for (const value of [
    "creative_campaign_packs",
    "creative_campaign_schedule",
    "creative_growth_reviews",
    "enable row level security",
    "creative_studio_member",
    "creative_studio_manage",
    "publishing_enabled=false",
    "recommendation_only=true",
    "creative_timeline",
    "Version E",
    "create_growth_campaign_pack",
  ])
    assert.match(sql, new RegExp(value, "i"));
});
