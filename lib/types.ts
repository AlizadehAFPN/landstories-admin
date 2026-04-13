// Types aligned with Landstories mobile app (Feb 2026)

export type LanguageCode =
  | "en"
  | "es"
  | "zh"
  | "fr"
  | "ar"
  | "fa"
  | "tr"
  | "ru"
  | "ko"
  | "de"
  | "ja";

export type StoryCategory =
  | "gods_monsters"
  | "crowns_conquests"
  | "love_heartbreak"
  | "riddles_past"
  | "ghosts_curses"
  | "builders_wonders"
  | "prophets_pilgrims"
  | "tricksters_folk_tales"
  | "place_names"
  | "lost_found";

export type ExploreCategory =
  | "ancient_ruins"
  | "castles_fortresses"
  | "sacred_grounds"
  | "underground_worlds"
  | "palaces_courts"
  | "natures_monuments"
  | "crossroads"
  | "tombs_afterlife"
  | "battlefields"
  | "living_heritage"
  | "museums_collections";

export type Tier = "S" | "A" | "B" | "C";

/** TTS backends — must match Landstories `types/api` `TtsProvider` and audio Lambda `provider` query param */
export type TtsProvider = "polly" | "openai" | "elevenlabs" | "azure";

// ─────────────────────────────────────────────────────────────
// Paragraph & Audio
// ─────────────────────────────────────────────────────────────

export interface StoryParagraph {
  text: string;
  audio?: {
    url: string;
    durationSeconds: number;
  };
  audioProviders?: Record<
    string,
    { url: string; durationSeconds: number; voiceId: string; provider: string }
  >;
}

// ─────────────────────────────────────────────────────────────
// Story (separate Story DynamoDB table)
// ─────────────────────────────────────────────────────────────

export interface StorySummary {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  icon: string;
  storyCategory: StoryCategory;
  era: string;
  tier: Tier;
  isFree: boolean;
  readingTimeMinutes: number;
  hasAudio: boolean;
  characters: string[];
  moralOrLesson: string;
  thumbnail?: string;
  image?: string;
  coordinates?: { lat: number; lng: number };
}

/** Full story record in the Story DynamoDB table.
 *  PK = siteId, SK = "{lang}#{storyId}" */
export interface StoryRecord {
  siteId: string;
  langStoryId: string;
  storyId: string;
  lang: LanguageCode;
  title: string;
  subtitle: string;
  excerpt: string;
  icon: string;
  storyCategory: StoryCategory;
  era: string;
  tier: Tier;
  isFree: boolean;
  isFeatured: boolean;
  hasAudio: boolean;
  characters: string[];
  moralOrLesson: string;
  coordinates?: { lat: number; lng: number };
  thumbnail: string;
  image: string;
  readingTimeMinutes: number;
  paragraphs: StoryParagraph[];
  source: string;
  updatedAt: number;
  disabled?: boolean;
}

/** Story as shown in the admin panel (augmented with site title) */
export interface AdminStory extends StoryRecord {
  siteTitle: string;
}

// ─────────────────────────────────────────────────────────────
// Site (Landstories DynamoDB table)
// ─────────────────────────────────────────────────────────────

export interface SiteSummary {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  lat: number;
  lng: number;
  category: ExploreCategory;
  countryId: string;
  cityId: string;
  unesco: boolean;
  stories: StorySummary[];
  updatedAt: number;
}

/** Full site record in the Landstories DynamoDB table.
 *  PK = SITE#{siteId}, SK = LANG#{lang} */
export interface SiteRecord {
  PK: string;
  SK: string;
  "GSI1-PK": string;
  "GSI1-SK": number;
  "GSI2-PK": string;
  "GSI2-SK": number;
  siteId: string;
  lang: LanguageCode;
  lat: number;
  lng: number;
  category: ExploreCategory;
  countryId: string;
  cityId: string;
  unesco: boolean;
  thumbnail: string;
  images?: string[];
  updatedAt: number;
  title: string;
  shortDescription: string;
  // Extended site detail fields
  description: string;
  nameLocal?: string;
  constructionYear?: string;
  builder?: string;
  historicalPeriod?: string;
  historicalSignificance?: string;
  timeline?: string[];
  funFacts?: string[];
  tags?: string[];
  disabled?: boolean;
}

/** Site as shown in the admin panel */
export interface AdminSite {
  siteId: string;
  lang: LanguageCode;
  title: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  lat: number;
  lng: number;
  category: ExploreCategory;
  countryId: string;
  cityId: string;
  unesco: boolean;
  updatedAt: number;
  storyCount: number;
  // Extended fields
  description: string;
  nameLocal: string;
  constructionYear: string;
  builder: string;
  historicalPeriod: string;
  historicalSignificance: string;
  timeline: string[];
  funFacts: string[];
  tags: string[];
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────

/** DynamoDB record for ExploreCategory / StoryCategory tables */
export interface CategoryItem {
  id: string;
  titleKey: string;
  icon: string;
  order: number;
  gradientColors?: [string, string];
}

// ─────────────────────────────────────────────────────────────
// Locations (Country & City tables)
// ─────────────────────────────────────────────────────────────

export interface CountryItem {
  id: string;       // ISO alpha-2 code, e.g. "TR"
  name: string;     // e.g. "Turkey"
  flag: string;     // emoji flag, e.g. "🇹🇷"
  disabled?: boolean;
}

export interface CityItem {
  id: string;       // slug, e.g. "istanbul"
  name: string;     // e.g. "Istanbul"
  countryId: string; // FK to Country, e.g. "TR"
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────

export interface DashboardStats {
  totalSites: number;
  totalStories: number;
  languages: number;
  categories: { explore: number; story: number };
  countryIds: string[];
  tiers: Record<Tier, number>;
}

// ─────────────────────────────────────────────────────────────
// Device Tokens (for Push Notifications)
// ─────────────────────────────────────────────────────────────

export type DevicePlatform = "ios" | "android" | "web";

/** DynamoDB record in DeviceToken table.
 *  PK = userId (Cognito sub), SK = token (FCM token) */
export interface DeviceTokenRecord {
  userId: string;
  token: string;
  platform: DevicePlatform;
  appVersion?: string;
  updatedAt: number;
  ttl: number;
}

// ─────────────────────────────────────────────────────────────
// Cognito Users
// ─────────────────────────────────────────────────────────────

export interface CognitoUser {
  userId: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  picture?: string;
  /** Cognito standard `locale` — app UI language (e.g. en, fr). */
  locale?: string;
  provider?: string;
  enabled: boolean;
  createdAt?: string;
  status?: string;
}

// ─────────────────────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────────────────────

export type NotificationType = "story" | "site" | "category" | "general";

export interface NotificationPayload {
  title: string;
  body: string;
  imageUrl?: string;
  type?: NotificationType;
  storyId?: string;
  siteId?: string;
  categoryId?: string;
}

export interface NotificationTarget {
  mode: "broadcast" | "topic" | "users";
  topic?: string;
  userIds?: string[];
}

/** DynamoDB record in NotificationLog table.
 *  PK = id (uuid), SK = sentAt (epoch seconds) */
export interface NotificationLogRecord {
  id: string;
  sentAt: number;
  title: string;
  body: string;
  imageUrl?: string;
  type?: NotificationType;
  targetMode: "broadcast" | "topic" | "users";
  topic?: string;
  targetUserIds?: string[];
  successCount: number;
  failureCount: number;
  storyId?: string;
  siteId?: string;
  categoryId?: string;
}

// ─────────────────────────────────────────────────────────────
// Analytics
// ─────────────────────────────────────────────────────────────

// ─── Custom Analytics Events ───────────────────────────────

export type AnalyticsEventType = "story_click" | "site_click" | "audio_play";

export interface AnalyticsEventInput {
  eventType: AnalyticsEventType;
  storyId?: string;
  siteId?: string;
  storyTitle?: string;
  siteTitle?: string;
  lang?: string;
  audioProvider?: string;
  platform?: string;
  timestamp?: number;
}

export interface EventSummary {
  storyClicks: number;
  siteClicks: number;
  audioPlays: number;
}

export interface EventTimeSeriesRow {
  date: string;
  storyClicks: number;
  siteClicks: number;
  audioPlays: number;
}

export interface TopEventContentRow {
  id: string;
  title: string;
  clicks: number;
}

export interface RecentEventRow {
  eventType: AnalyticsEventType;
  storyTitle?: string;
  siteTitle?: string;
  userId: string;
  timestamp: number;
  lang?: string;
  audioProvider?: string;
}

// ─── GA4 Analytics ─────────────────────────────────────────

export interface AnalyticsMetric {
  label: string;
  value: number;
  change?: number;
}

export interface AnalyticsTimeSeries {
  date: string;
  activeUsers: number;
  sessions: number;
  screenPageViews: number;
}

export interface AnalyticsTopContent {
  pageTitle: string;
  screenPageViews: number;
  activeUsers: number;
}

export interface AnalyticsUsersByCountry {
  country: string;
  activeUsers: number;
}

export interface AnalyticsUsersByPlatform {
  platform: string;
  activeUsers: number;
}
