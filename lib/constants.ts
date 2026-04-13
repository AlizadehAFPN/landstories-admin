import type { LanguageCode, ExploreCategory, StoryCategory } from "./types";

export const RTL_LANGUAGES: Set<LanguageCode> = new Set(["ar", "fa"]);

export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "zh", label: "Chinese" },
  { code: "fr", label: "French" },
  { code: "ar", label: "Arabic" },
  { code: "fa", label: "Persian (Farsi)" },
  { code: "tr", label: "Turkish" },
  { code: "ru", label: "Russian" },
  { code: "ko", label: "Korean" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
];

export const EXPLORE_CATEGORIES: { id: ExploreCategory; label: string }[] = [
  { id: "ancient_ruins", label: "Ancient Ruins" },
  { id: "castles_fortresses", label: "Castles & Fortresses" },
  { id: "sacred_grounds", label: "Sacred Grounds" },
  { id: "underground_worlds", label: "Underground Worlds" },
  { id: "palaces_courts", label: "Palaces & Courts" },
  { id: "natures_monuments", label: "Nature's Monuments" },
  { id: "crossroads", label: "Crossroads" },
  { id: "tombs_afterlife", label: "Tombs & Afterlife" },
  { id: "battlefields", label: "Battlefields" },
  { id: "living_heritage", label: "Living Heritage" },
  { id: "museums_collections", label: "Museums & Collections" },
];

export const STORY_CATEGORIES: { id: StoryCategory; label: string }[] = [
  { id: "gods_monsters", label: "Gods & Monsters" },
  { id: "crowns_conquests", label: "Crowns & Conquests" },
  { id: "love_heartbreak", label: "Love & Heartbreak" },
  { id: "riddles_past", label: "Riddles of the Past" },
  { id: "ghosts_curses", label: "Ghosts & Curses" },
  { id: "builders_wonders", label: "Builders & Wonders" },
  { id: "prophets_pilgrims", label: "Prophets & Pilgrims" },
  { id: "tricksters_folk_tales", label: "Tricksters & Folk Tales" },
  { id: "place_names", label: "Place Names" },
  { id: "lost_found", label: "Lost & Found" },
];

export const TABLE_SITES = process.env.DYNAMO_TABLE_SITES ?? "Landstories";
export const TABLE_STORIES = process.env.DYNAMO_TABLE_STORIES ?? "Story";
export const TABLE_EXPLORE_CATEGORIES =
  process.env.DYNAMO_TABLE_EXPLORE_CATEGORIES ?? "ExploreCategory";
export const TABLE_STORY_CATEGORIES =
  process.env.DYNAMO_TABLE_STORY_CATEGORIES ?? "StoryCategory";

export const TABLE_COUNTRIES =
  process.env.DYNAMO_TABLE_COUNTRIES ?? "Country";
export const TABLE_CITIES =
  process.env.DYNAMO_TABLE_CITIES ?? "City";

export const TABLE_DEVICE_TOKENS =
  process.env.DYNAMO_TABLE_DEVICE_TOKENS ?? "DeviceToken";

export const TABLE_NOTIFICATION_LOG =
  process.env.DYNAMO_TABLE_NOTIFICATION_LOG ?? "NotificationLog";

export const TABLE_ANALYTICS_EVENTS =
  process.env.DYNAMO_TABLE_ANALYTICS_EVENTS ?? "AnalyticsEvent";

export const AUDIO_LAMBDA_NAME =
  process.env.AUDIO_LAMBDA_NAME ?? "landstories-audio-gen";
export const AUDIO_S3_BUCKET = process.env.AUDIO_S3_BUCKET ?? "";
export const IMAGES_S3_BUCKET =
  process.env.IMAGES_S3_BUCKET ?? "landstories-images";
