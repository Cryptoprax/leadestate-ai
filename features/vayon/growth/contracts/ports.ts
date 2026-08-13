import type { Campaign, ContentAsset, GrowthObjective, LandingPage, MarketingAnalyticsQuery, MarketingAnalyticsResult, MarketingCalendarItem, MarketingForm, PublishingJob, PublishingValidation, QRCodeDefinition, ReferralProgram, SocialAccount } from "../domain/contracts";
export interface GrowthRepository { campaigns(): readonly Campaign[]; content(): readonly ContentAsset[]; calendar(): readonly MarketingCalendarItem[]; pages(): readonly LandingPage[]; forms(): readonly MarketingForm[]; referrals(): readonly ReferralProgram[]; qrCodes(): readonly QRCodeDefinition[]; objectives(): readonly GrowthObjective[] }
export interface SocialAccountRegistry { register(account: SocialAccount): void; list(workspaceId?: string): readonly SocialAccount[] }
export interface CampaignService { list(): readonly Campaign[]; save(campaign: Campaign): void }
export interface ContentStudio { list(): readonly ContentAsset[]; save(asset: ContentAsset): void }
export interface PublishingCenter { validate(job: PublishingJob): PublishingValidation; queue(job: PublishingJob): PublishingJob; history(): readonly PublishingJob[] }
export interface MarketingCalendarService { list(view: "month" | "week" | "day", range?: { from: string; to: string }): readonly MarketingCalendarItem[] }
export interface LandingPageService { list(): readonly LandingPage[]; save(page: LandingPage): void }
export interface MarketingFormService { list(): readonly MarketingForm[]; validate(form: MarketingForm, values: Readonly<Record<string, unknown>>): readonly string[] }
export interface ReferralService { list(): readonly ReferralProgram[]; save(program: ReferralProgram): void }
export interface QRCodeService { list(): readonly QRCodeDefinition[]; save(definition: QRCodeDefinition): void }
export interface MarketingAnalyticsProvider { query(query: MarketingAnalyticsQuery): Promise<MarketingAnalyticsResult> }
export interface GrowthObjectiveService { list(): readonly GrowthObjective[]; save(objective: GrowthObjective): void }

