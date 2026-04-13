"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Pencil,
  Trash2,
  Play,
  Square,
  Volume2,
  Loader2,
  X,
  Search,
  Eye,
} from "lucide-react";
import { STORY_CATEGORIES, LANGUAGES, RTL_LANGUAGES } from "@/lib/constants";
import { ImageUpload } from "@/components/ImageUpload";
import type {
  AdminStory,
  AdminSite,
  StoryCategory,
  StoryParagraph,
  Tier,
  LanguageCode,
  CountryItem,
  CityItem,
  TtsProvider,
} from "@/lib/types";

/** Story as returned by the list API (paragraphs stripped for performance) */
type StoryListItem = Omit<AdminStory, "paragraphs"> & { paragraphCount: number };

const TIERS: Tier[] = ["S", "A", "B", "C"];

/** Languages with native AWS Polly neural/generative support (mirrors Landstories VoiceProviderSheet). */
const POLLY_SUPPORTED_LANGUAGES = new Set<LanguageCode>([
  "en",
  "es",
  "zh",
  "fr",
  "ar",
  "tr",
  "ru",
  "ko",
  "de",
  "ja",
]);

/** Persian: ElevenLabs reads with wrong accent in the app — hide generate for `fa`. */
const ELEVENLABS_EXCLUDED_LANGUAGES = new Set<LanguageCode>(["fa"]);

const TTS_PROVIDER_ORDER: TtsProvider[] = [
  "azure",
  "elevenlabs",
  "openai",
  "polly",
];

function audioProvidersForLang(lang: LanguageCode): TtsProvider[] {
  const providers: TtsProvider[] = ["azure"];
  if (!ELEVENLABS_EXCLUDED_LANGUAGES.has(lang)) {
    providers.push("elevenlabs");
  }
  providers.push("openai");
  if (POLLY_SUPPORTED_LANGUAGES.has(lang)) {
    providers.push("polly");
  }
  return providers;
}

/** Providers to show for a paragraph: allowed for this language, plus any already stored (e.g. legacy data). */
function ttsProvidersForParagraph(
  lang: LanguageCode,
  paragraph: StoryParagraph
): TtsProvider[] {
  const allowed = new Set(audioProvidersForLang(lang));
  const existing = Object.keys(paragraph.audioProviders ?? {}) as TtsProvider[];
  const ordered: TtsProvider[] = [];
  for (const p of TTS_PROVIDER_ORDER) {
    if (allowed.has(p) || existing.includes(p)) ordered.push(p);
  }
  for (const k of existing) {
    if (!ordered.includes(k)) ordered.push(k);
  }
  return ordered;
}

const TTS_PROVIDER_LABELS: Record<TtsProvider, string> = {
  polly: "Polly",
  openai: "OpenAI",
  elevenlabs: "ElevenLabs",
  azure: "Azure",
};

function ttsProviderLabel(provider: TtsProvider): string {
  return TTS_PROVIDER_LABELS[provider];
}

interface StoryForm {
  storyId: string;
  lang: LanguageCode;
  title: string;
  subtitle: string;
  excerpt: string;
  icon: string;
  storyCategory: StoryCategory | "";
  era: string;
  tier: Tier | "";
  isFree: boolean;
  isFeatured: boolean;
  hasAudio: boolean;
  characters: string;
  moralOrLesson: string;
  paragraphs: StoryParagraph[];
  source: string;
  siteId: string;
  thumbnail: string;
  image: string;
}

const emptyForm: StoryForm = {
  storyId: "",
  lang: "en",
  title: "",
  subtitle: "",
  excerpt: "",
  icon: "",
  storyCategory: "",
  era: "",
  tier: "",
  isFree: false,
  isFeatured: false,
  hasAudio: false,
  characters: "",
  moralOrLesson: "",
  paragraphs: [{ text: "" }],
  source: "",
  siteId: "",
  thumbnail: "",
  image: "",
};

/** Compute reading time from paragraphs (words / 200, min 1) */
function computeReadingTime(paragraphs: StoryParagraph[]): number {
  const allText = paragraphs.map((p) => p.text).join(" ");
  const words = allText.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
}

function LanguageAddDropdown({
  existingLangs,
  onSelect,
}: {
  existingLangs: LanguageCode[];
  onSelect: (lang: LanguageCode) => void;
}) {
  const available = LANGUAGES.filter((l) => !existingLangs.includes(l.code));
  if (available.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-5 px-1.5 border-dashed text-[10px] gap-0.5">
          <Plus className="h-3 w-3" />
          Add
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {available.map((l) => (
          <DropdownMenuItem key={l.code} onClick={() => onSelect(l.code)}>
            {l.label} ({l.code})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function StoriesPage() {
  const [stories, setStories] = useState<StoryListItem[]>([]);
  const [sites, setSites] = useState<AdminSite[]>([]);
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminStory | null>(null);
  const [form, setForm] = useState<StoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [translationSource, setTranslationSource] = useState<StoryListItem | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<StoryListItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Preview state
  const [previewStory, setPreviewStory] = useState<AdminStory | null>(null);
  const [previewLoading, setPreviewLoading] = useState<string | null>(null);

  // Audio state
  const [audioLoading, setAudioLoading] = useState<Record<string, boolean>>({});
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [filterLang, setFilterLang] = useState<LanguageCode>("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [loadingStoryId, setLoadingStoryId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterTiers, setFilterTiers] = useState<Set<string>>(new Set());
  const [filterSite, setFilterSite] = useState<string>("all");
  const [filterFree, setFilterFree] = useState<string>("all");
  const [filterFeatured, setFilterFeatured] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");

  // Unique site IDs for filter dropdown (English sites only)
  const englishSites = useMemo(
    () => sites.filter((s) => s.lang === "en").sort((a, b) => a.title.localeCompare(b.title)),
    [sites],
  );

  // Lookup maps
  const countryMap = useMemo(() => {
    const map = new Map<string, CountryItem>();
    for (const c of countries) map.set(c.id, c);
    return map;
  }, [countries]);
  const cityMap = useMemo(() => {
    const map = new Map<string, CityItem>();
    for (const c of cities) map.set(c.id, c);
    return map;
  }, [cities]);

  // Site lookup for deriving country/city from siteId
  const siteMap = useMemo(() => {
    const map = new Map<string, AdminSite>();
    for (const s of englishSites) map.set(s.siteId, s);
    return map;
  }, [englishSites]);

  // Countries/cities used across English sites (for filter dropdowns)
  const usedCountryIds = useMemo(
    () => [...new Set(englishSites.map((s) => s.countryId).filter(Boolean))].sort(),
    [englishSites],
  );
  const usedCityIds = useMemo(
    () => [...new Set(englishSites.map((s) => s.cityId).filter(Boolean))].sort(),
    [englishSites],
  );

  const countryLabel = (id: string) => {
    const c = countryMap.get(id);
    return c ? `${c.flag || ""} ${c.name}`.trim() : id;
  };
  const cityLabel = (id: string) => cityMap.get(id)?.name ?? id;

  const langStories = useMemo(
    () => stories.filter((s) => s.lang === filterLang),
    [stories, filterLang],
  );

  const hasActiveFilters = searchQuery || filterCategory !== "all" || filterTiers.size > 0 || filterSite !== "all" || filterFree !== "all" || filterFeatured !== "all" || filterStatus !== "all" || filterCountry !== "all" || filterCity !== "all";

  function clearAllFilters() {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterTiers(new Set());
    setFilterSite("all");
    setFilterFree("all");
    setFilterFeatured("all");
    setFilterStatus("all");
    setFilterCountry("all");
    setFilterCity("all");
  }

  function toggleTier(tier: string) {
    setFilterTiers((prev) => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  }

  // Filter stories by selected language + all filters
  const filteredStories = useMemo(
    () =>
      langStories
        .filter((s) => {
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            if (!s.title.toLowerCase().includes(q) && !s.storyId.toLowerCase().includes(q)) return false;
          }
          if (filterCategory !== "all" && s.storyCategory !== filterCategory) return false;
          if (filterTiers.size > 0 && !filterTiers.has(s.tier)) return false;
          if (filterSite !== "all" && s.siteId !== filterSite) return false;
          if (filterFree === "free" && !s.isFree) return false;
          if (filterFree === "paid" && s.isFree) return false;
          if (filterFeatured === "featured" && !s.isFeatured) return false;
          if (filterFeatured === "not_featured" && s.isFeatured) return false;
          if (filterStatus === "enabled" && s.disabled) return false;
          if (filterStatus === "disabled" && !s.disabled) return false;
          if (filterCountry !== "all" || filterCity !== "all") {
            const site = siteMap.get(s.siteId);
            if (filterCountry !== "all" && site?.countryId !== filterCountry) return false;
            if (filterCity !== "all" && site?.cityId !== filterCity) return false;
          }
          return true;
        })
        .sort((a, b) => a.title.localeCompare(b.title)),
    [langStories, searchQuery, filterCategory, filterTiers, filterSite, filterFree, filterFeatured, filterStatus, filterCountry, filterCity, siteMap],
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredStories.length / pageSize));
  const paginatedStories = useMemo(
    () => {
      const safePage = Math.min(currentPage, totalPages);
      return filteredStories.slice((safePage - 1) * pageSize, safePage * pageSize);
    },
    [filteredStories, currentPage, pageSize, totalPages],
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterLang, searchQuery, filterCategory, filterTiers, filterSite, filterFree, filterFeatured, filterStatus, filterCountry, filterCity]);

  // Clamp page if stories were deleted
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Build a lookup of existing langs per story (for translation dropdown)
  const storyLangsMap = useMemo(() => {
    const map = new Map<string, LanguageCode[]>();
    for (const s of stories) {
      const key = `${s.siteId}::${s.storyId}`;
      const langs = map.get(key) ?? [];
      langs.push(s.lang);
      map.set(key, langs);
    }
    return map;
  }, [stories]);

  const isRtl = RTL_LANGUAGES.has(form.lang);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [storiesRes, sitesRes, countriesRes, citiesRes] = await Promise.all([
        fetch("/api/stories"),
        fetch("/api/sites"),
        fetch("/api/locations?type=country"),
        fetch("/api/locations?type=city"),
      ]);
      if (!storiesRes.ok || !sitesRes.ok) throw new Error("Failed to fetch");
      setStories(await storiesRes.json());
      setSites(await sitesRes.json());
      if (countriesRes.ok) setCountries(await countriesRes.json());
      if (citiesRes.ok) setCities(await citiesRes.json());
    } catch {
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function openAdd() {
    setEditing(null);
    setTranslationSource(null);
    setForm({ ...emptyForm, lang: "en" });
    setFormError("");
    setDialogOpen(true);
  }

  async function openEdit(story: StoryListItem) {
    const key = `${story.siteId}-${story.storyId}-${story.lang}`;
    setLoadingStoryId(key);
    try {
      const res = await fetch(
        `/api/stories/detail?siteId=${encodeURIComponent(story.siteId)}&storyId=${encodeURIComponent(story.storyId)}&lang=${story.lang}`,
      );
      if (!res.ok) throw new Error("Failed to fetch story details");
      const s: AdminStory = await res.json();

      setEditing(s);
      setTranslationSource(null);
      setForm({
        storyId: s.storyId,
        lang: s.lang,
        title: s.title,
        subtitle: s.subtitle,
        excerpt: s.excerpt,
        icon: s.icon,
        storyCategory: s.storyCategory,
        era: s.era,
        tier: s.tier,
        isFree: s.isFree,
        isFeatured: s.isFeatured ?? false,
        hasAudio: s.hasAudio,
        characters: (s.characters ?? []).join(", "),
        moralOrLesson: s.moralOrLesson,
        paragraphs:
          s.paragraphs && s.paragraphs.length > 0
            ? s.paragraphs.map((p) => ({ ...p }))
            : [{ text: "" }],
        source: s.source,
        siteId: s.siteId,
        thumbnail: s.thumbnail ?? "",
        image: s.image ?? "",
      });
      setFormError("");
      setAudioLoading({});
      setPlayingAudio(null);
      setDialogOpen(true);
    } catch {
      setError("Failed to load story details.");
    } finally {
      setLoadingStoryId(null);
    }
  }

  async function openPreview(story: StoryListItem) {
    const key = `${story.siteId}-${story.storyId}-${story.lang}`;
    setPreviewLoading(key);
    try {
      const res = await fetch(
        `/api/stories/detail?siteId=${encodeURIComponent(story.siteId)}&storyId=${encodeURIComponent(story.storyId)}&lang=${story.lang}`,
      );
      if (!res.ok) throw new Error("Failed to fetch story details");
      const s: AdminStory = await res.json();
      setPreviewStory(s);
    } catch {
      setError("Failed to load story for preview.");
    } finally {
      setPreviewLoading(null);
    }
  }

  function openTranslation(source: StoryListItem, targetLang: LanguageCode) {
    setEditing(null);
    setTranslationSource(source);
    setForm({
      storyId: source.storyId,
      lang: targetLang,
      title: "",
      subtitle: "",
      excerpt: "",
      icon: source.icon,
      storyCategory: source.storyCategory,
      era: "",
      tier: source.tier,
      isFree: source.isFree,
      isFeatured: source.isFeatured ?? false,
      hasAudio: false,
      characters: "",
      moralOrLesson: "",
      paragraphs: [{ text: "" }],
      source: "",
      siteId: source.siteId,
      thumbnail: source.thumbnail ?? "",
      image: source.image ?? "",
    });
    setFormError("");
    setAudioLoading({});
    setPlayingAudio(null);
    setDialogOpen(true);
  }

  // ── Paragraph helpers ──

  function updateParagraphText(index: number, text: string) {
    setForm((prev) => {
      const paragraphs = [...prev.paragraphs];
      // When text changes, discard audio (it's now stale)
      const existing = paragraphs[index];
      if (existing.text !== text) {
        paragraphs[index] = { text };
      }
      return { ...prev, paragraphs };
    });
  }

  function addParagraph() {
    setForm((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, { text: "" }],
    }));
  }

  function removeParagraph(index: number) {
    setForm((prev) => {
      if (prev.paragraphs.length <= 1) return prev;
      const paragraphs = prev.paragraphs.filter((_, i) => i !== index);
      return { ...prev, paragraphs };
    });
  }

  // ── Audio handlers ──

  function audioKey(index: number, provider: string) {
    return `${index}-${provider}`;
  }

  async function handleGenerateAudio(index: number, provider: string) {
    if (!editing) return;
    const key = audioKey(index, provider);
    setAudioLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/stories/audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: form.storyId,
          siteId: form.siteId,
          lang: form.lang,
          paragraphIndex: index,
          provider,
          // Lambda reads paragraphs from Dynamo; send draft text so generation matches the editor.
          text: form.paragraphs[index]?.text ?? "",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Audio generation failed");
      }

      const data = await res.json();
      const para = data.paragraph;

      // Update form paragraphs with the new audio data
      setForm((prev) => {
        const paragraphs = [...prev.paragraphs];
        const p = { ...paragraphs[index] };

        const audioEntry = {
          url: para.url,
          durationSeconds: para.durationSeconds,
          voiceId: para.voiceId ?? "",
          provider,
        };

        p.audioProviders = { ...(p.audioProviders ?? {}), [provider]: audioEntry };
        p.audio = { url: para.url, durationSeconds: para.durationSeconds };
        paragraphs[index] = p;
        return { ...prev, paragraphs, hasAudio: true };
      });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to generate audio"
      );
    } finally {
      setAudioLoading((prev) => ({ ...prev, [key]: false }));
    }
  }

  async function handleDeleteAudio(index: number, provider: string) {
    if (!editing) return;
    const key = audioKey(index, provider);
    setAudioLoading((prev) => ({ ...prev, [key]: true }));

    try {
      const res = await fetch("/api/stories/audio", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: form.storyId,
          siteId: form.siteId,
          lang: form.lang,
          paragraphIndex: index,
          provider,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Audio deletion failed");
      }

      const data = await res.json();

      // Update form paragraphs
      setForm((prev) => {
        const paragraphs = [...prev.paragraphs];
        const p = { ...paragraphs[index] };

        if (p.audioProviders) {
          const providers = { ...p.audioProviders };
          delete providers[provider];
          if (Object.keys(providers).length === 0) {
            delete p.audioProviders;
            delete p.audio;
          } else {
            p.audioProviders = providers;
            // Set audio to first remaining provider
            const fallbackKey = Object.keys(providers)[0];
            const fallback = providers[fallbackKey];
            p.audio = { url: fallback.url, durationSeconds: fallback.durationSeconds };
          }
        }

        paragraphs[index] = p;
        return { ...prev, paragraphs, hasAudio: data.hasAudio };
      });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to delete audio"
      );
    } finally {
      setAudioLoading((prev) => ({ ...prev, [key]: false }));
    }
  }

  function handlePlayAudio(url: string, key: string) {
    // Stop current if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingAudio === key) {
      setPlayingAudio(null);
      return;
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingAudio(key);
    audio.play().catch(() => {
      // Ignore AbortError when pause() is called before play() resolves
    });
    audio.onended = () => {
      setPlayingAudio(null);
      audioRef.current = null;
    };
  }

  function handleStopAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAudio(null);
  }

  // ── Save ──

  async function handleSave() {
    setFormError("");

    if (
      !form.storyId.trim() ||
      !form.title.trim() ||
      !form.storyCategory ||
      !form.tier ||
      !form.siteId
    ) {
      setFormError("Story ID, title, story category, tier, and site are required.");
      return;
    }

    if (!/^[a-z0-9][a-z0-9_-]*$/.test(form.storyId.trim())) {
      setFormError("Story ID must be lowercase alphanumeric with hyphens/underscores.");
      return;
    }

    // Prevent duplicate IDs when adding new (check same storyId + lang combination)
    if (
      !editing &&
      stories.some(
        (s) => s.storyId === form.storyId.trim() && s.lang === form.lang
      )
    ) {
      setFormError(
        `A story with this ID already exists for ${LANGUAGES.find((l) => l.code === form.lang)?.label ?? form.lang}.`
      );
      return;
    }

    setSaving(true);
    handleStopAudio();
    try {
      const previousSiteId = editing?.siteId ?? null;
      // Strip empty paragraphs
      const paragraphs = form.paragraphs
        .filter((p) => p.text.trim())
        .map((p) => ({
          text: p.text.trim(),
          ...(p.audio ? { audio: p.audio } : {}),
          ...(p.audioProviders ? { audioProviders: p.audioProviders } : {}),
        }));

      const payload = {
        story: {
          storyId: form.storyId.trim(),
          siteId: form.siteId,
          langStoryId: `${form.lang}#${form.storyId.trim()}`,
          lang: form.lang,
          title: form.title.trim(),
          subtitle: form.subtitle.trim(),
          excerpt: form.excerpt.trim(),
          icon: form.icon.trim(),
          storyCategory: form.storyCategory as StoryCategory,
          era: form.era.trim(),
          tier: form.tier as Tier,
          isFree: form.isFree,
          isFeatured: form.isFeatured,
          hasAudio: form.hasAudio,
          characters: form.characters
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
          moralOrLesson: form.moralOrLesson.trim(),
          paragraphs,
          source: form.source.trim(),
          thumbnail: form.thumbnail.trim(),
          image: form.image.trim(),
          readingTimeMinutes: computeReadingTime(form.paragraphs),
          updatedAt: Math.floor(Date.now() / 1000),
        },
        previousSiteId,
      };

      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setDialogOpen(false);
      await fetchData();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save story.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/stories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: deleteTarget.storyId,
          siteId: deleteTarget.siteId,
          lang: deleteTarget.lang,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      await fetchData();
    } catch {
      setError("Failed to delete story.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleToggleDisabled(story: StoryListItem) {
    const newDisabled = !story.disabled;
    // Optimistic update
    setStories((prev) =>
      prev.map((s) =>
        s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
          ? { ...s, disabled: newDisabled }
          : s
      )
    );
    try {
      const res = await fetch("/api/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: story.storyId,
          siteId: story.siteId,
          lang: story.lang,
          disabled: newDisabled,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      // Revert on failure
      setStories((prev) =>
        prev.map((s) =>
          s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
            ? { ...s, disabled: !newDisabled }
            : s
        )
      );
      setError("Failed to update story status.");
    }
  }

  async function handleToggleFree(story: StoryListItem) {
    const newIsFree = !story.isFree;
    setStories((prev) =>
      prev.map((s) =>
        s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
          ? { ...s, isFree: newIsFree }
          : s,
      ),
    );
    try {
      const res = await fetch("/api/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: story.storyId,
          siteId: story.siteId,
          lang: story.lang,
          isFree: newIsFree,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setStories((prev) =>
        prev.map((s) =>
          s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
            ? { ...s, isFree: !newIsFree }
            : s,
        ),
      );
      setError("Failed to update story free status.");
    }
  }

  async function handleToggleFeatured(story: StoryListItem) {
    const newVal = !story.isFeatured;
    setStories((prev) =>
      prev.map((s) =>
        s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
          ? { ...s, isFeatured: newVal }
          : s,
      ),
    );
    try {
      const res = await fetch("/api/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId: story.storyId,
          siteId: story.siteId,
          lang: story.lang,
          isFeatured: newVal,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      setStories((prev) =>
        prev.map((s) =>
          s.storyId === story.storyId && s.siteId === story.siteId && s.lang === story.lang
            ? { ...s, isFeatured: !newVal }
            : s,
        ),
      );
      setError("Failed to update story featured status.");
    }
  }

  const catLabel = (id: string) =>
    STORY_CATEGORIES.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Stories</h1>
          <Select
            value={filterLang}
            onValueChange={(v) => setFilterLang(v as LanguageCode)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l.code} value={l.code}>
                  {l.label} ({l.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Story
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[170px] h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {STORY_CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[110px] h-9 justify-between font-normal">
                  {filterTiers.size === 0
                    ? "All Tiers"
                    : filterTiers.size === 1
                      ? `Tier ${[...filterTiers][0]}`
                      : `${filterTiers.size} Tiers`}
                  <span className="ml-auto opacity-50 text-xs">&#x25BE;</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {TIERS.map((t) => (
                  <DropdownMenuCheckboxItem
                    key={t}
                    checked={filterTiers.has(t)}
                    onCheckedChange={() => toggleTier(t)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    Tier {t}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Select value={filterSite} onValueChange={setFilterSite}>
              <SelectTrigger className="w-[170px] h-9">
                <SelectValue placeholder="Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {englishSites.map((s) => (
                  <SelectItem key={s.siteId} value={s.siteId}>{s.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCountry} onValueChange={setFilterCountry}>
              <SelectTrigger className="w-[170px] h-9">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {usedCountryIds.map((id) => (
                  <SelectItem key={id} value={id}>{countryLabel(id)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCity} onValueChange={setFilterCity}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {usedCityIds.map((id) => (
                  <SelectItem key={id} value={id}>{cityLabel(id)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterFree} onValueChange={setFilterFree}>
              <SelectTrigger className="w-[110px] h-9">
                <SelectValue placeholder="Free" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFeatured} onValueChange={setFilterFeatured}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Featured</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="not_featured">Not Featured</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-9 px-2 text-muted-foreground">
                <X className="mr-1 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
          {hasActiveFilters && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing {filteredStories.length} of {langStories.length} stories
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Stories</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredStories.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No stories found for {LANGUAGES.find((l) => l.code === filterLang)?.label ?? filterLang}.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead className="text-center">Langs</TableHead>
                    <TableHead className="text-center">Free</TableHead>
                    <TableHead className="text-center">Featured</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-44 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStories.map((story) => {
                    const storyKey = `${story.siteId}-${story.storyId}-${story.lang}`;
                    const isLoadingThis = loadingStoryId === storyKey;
                    const isPreviewLoading = previewLoading === storyKey;
                    return (
                    <TableRow key={storyKey}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{story.icon}</span>
                          <div>
                            <div className="font-medium">{story.title}</div>
                            <div className="text-xs text-muted-foreground font-mono">
                              {story.storyId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{catLabel(story.storyCategory)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Tier {story.tier}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{story.siteTitle}</div>
                        {(() => {
                          const site = siteMap.get(story.siteId);
                          if (!site) return null;
                          const parts = [site.countryId ? countryLabel(site.countryId) : "", site.cityId ? cityLabel(site.cityId) : ""].filter(Boolean);
                          return parts.length > 0 ? (
                            <div className="text-xs text-muted-foreground">{parts.join(" · ")}</div>
                          ) : null;
                        })()}
                      </TableCell>
                      <TableCell className="text-center">
                        {(() => {
                          const langs = storyLangsMap.get(`${story.siteId}::${story.storyId}`) ?? [story.lang];
                          const count = langs.length;
                          const total = LANGUAGES.length;
                          return (
                            <span className={`text-xs font-medium ${count === total ? "text-green-600" : "text-muted-foreground"}`}>
                              {count}/{total}
                            </span>
                          );
                        })()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={story.isFree}
                          onCheckedChange={() => handleToggleFree(story)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={story.isFeatured}
                          onCheckedChange={() => handleToggleFeatured(story)}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={!story.disabled}
                          onCheckedChange={() => handleToggleDisabled(story)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <LanguageAddDropdown
                            existingLangs={storyLangsMap.get(`${story.siteId}::${story.storyId}`) ?? [story.lang]}
                            onSelect={(targetLang) => openTranslation(story, targetLang)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openPreview(story)}
                            disabled={isPreviewLoading}
                            title="Preview"
                          >
                            {isPreviewLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(story)}
                            disabled={isLoadingThis}
                          >
                            {isLoadingThis ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Pencil className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteTarget(story)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(Math.min(currentPage, totalPages) - 1) * pageSize + 1}–{Math.min(Math.min(currentPage, totalPages) * pageSize, filteredStories.length)} of {filteredStories.length} stories
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={String(pageSize)}
                    onValueChange={(v) => {
                      setPageSize(Number(v));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[110px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25 / page</SelectItem>
                      <SelectItem value="50">50 / page</SelectItem>
                      <SelectItem value="100">100 / page</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage <= 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground min-w-[80px] text-center">
                    Page {Math.min(currentPage, totalPages)} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) handleStopAudio();
          setDialogOpen(open);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {translationSource
                ? `Add ${LANGUAGES.find((l) => l.code === form.lang)?.label} Translation`
                : editing
                ? "Edit Story"
                : "Add Story"}
            </DialogTitle>
            <DialogDescription>
              {translationSource
                ? `Translate "${translationSource.title}" into ${LANGUAGES.find((l) => l.code === form.lang)?.label}.`
                : editing
                ? `Update the story details. (${LANGUAGES.find((l) => l.code === form.lang)?.label})`
                : "Create a new story."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Translation info banner */}
            {translationSource && (
              <div className="rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-3 text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  Translating from English: &ldquo;{translationSource.title}&rdquo;
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                  Shared fields (ID, site, category, tier, images) are pre-filled.
                  Fill in the translated content below.
                </p>
              </div>
            )}

            {/* Language selector */}
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={form.lang}
                onValueChange={(v) => setForm({ ...form, lang: v as LanguageCode })}
                disabled={!!editing || !!translationSource}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l.code} value={l.code}>
                      {l.label} ({l.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 1: Story ID + Icon */}
            <div className="grid grid-cols-[1fr_100px] gap-4">
              <div className="space-y-2">
                <Label htmlFor="story-id">Story ID</Label>
                <Input
                  id="story-id"
                  placeholder="e.g. medusa-legend"
                  value={form.storyId}
                  onChange={(e) => setForm({ ...form, storyId: e.target.value })}
                  disabled={!!editing || !!translationSource}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-icon">Icon</Label>
                <Input
                  id="story-icon"
                  placeholder="⚡"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  disabled={!!translationSource}
                />
              </div>
            </div>

            {/* Row 2: Title */}
            <div className="space-y-2">
              <Label htmlFor="story-title">Title</Label>
              <Input
                id="story-title"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="e.g. The Curse of Medusa"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Row 3: Subtitle + Era */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="story-subtitle">Subtitle</Label>
                <Input
                  id="story-subtitle"
                  dir={isRtl ? "rtl" : "ltr"}
                  placeholder=""
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-era">Era</Label>
                <Input
                  id="story-era"
                  dir={isRtl ? "rtl" : "ltr"}
                  placeholder="e.g. Ancient Greece"
                  value={form.era}
                  onChange={(e) => setForm({ ...form, era: e.target.value })}
                />
              </div>
            </div>

            {/* Row 4: Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="story-excerpt">Excerpt</Label>
              <Textarea
                id="story-excerpt"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="Short preview text..."
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
              />
            </div>

            {/* Row 5: Category + Tier */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Story Category</Label>
                <Select
                  value={form.storyCategory}
                  onValueChange={(v) =>
                    setForm({ ...form, storyCategory: v as StoryCategory })
                  }
                  disabled={!!translationSource}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {STORY_CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tier</Label>
                <Select
                  value={form.tier}
                  onValueChange={(v) => setForm({ ...form, tier: v as Tier })}
                  disabled={!!translationSource}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIERS.map((t) => (
                      <SelectItem key={t} value={t}>
                        Tier {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 6: Linked Site (required) */}
            <div className="space-y-2">
              <Label>Site</Label>
              <Select
                value={form.siteId}
                onValueChange={(v) => setForm({ ...form, siteId: v })}
                disabled={!!translationSource}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a site" />
                </SelectTrigger>
                <SelectContent>
                  {sites
                    .filter((site) => site.lang === "en")
                    .map((site) => (
                      <SelectItem key={site.siteId} value={site.siteId}>
                        {site.title} ({site.countryId})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 7: Toggles */}
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <Switch
                  id="story-free"
                  checked={form.isFree}
                  onCheckedChange={(v) => setForm({ ...form, isFree: v })}
                  disabled={!!translationSource}
                />
                <Label htmlFor="story-free">Free</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="story-featured"
                  checked={form.isFeatured}
                  onCheckedChange={(v) => setForm({ ...form, isFeatured: v })}
                  disabled={!!translationSource}
                />
                <Label htmlFor="story-featured">Featured</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  id="story-audio"
                  checked={form.hasAudio}
                  onCheckedChange={(v) => setForm({ ...form, hasAudio: v })}
                />
                <Label htmlFor="story-audio">Has Audio</Label>
              </div>
            </div>

            {/* Row 8: Thumbnail + Image */}
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                id="story-thumb"
                label="Thumbnail"
                value={form.thumbnail}
                onChange={(url) => setForm({ ...form, thumbnail: url })}
                type="stories"
                entityId={form.storyId}
                purpose="thumbnail"
                disabled={!!translationSource}
              />
              <ImageUpload
                id="story-image"
                label="Image"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                type="stories"
                entityId={form.storyId}
                disabled={!!translationSource}
              />
            </div>

            {/* Row 9: Characters */}
            <div className="space-y-2">
              <Label htmlFor="story-chars">Characters (comma-separated)</Label>
              <Input
                id="story-chars"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="e.g. Medusa, Perseus, Athena"
                value={form.characters}
                onChange={(e) => setForm({ ...form, characters: e.target.value })}
              />
            </div>

            {/* Row 10: Moral or Lesson */}
            <div className="space-y-2">
              <Label htmlFor="story-moral">Moral or Lesson</Label>
              <Textarea
                id="story-moral"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder=""
                value={form.moralOrLesson}
                onChange={(e) => setForm({ ...form, moralOrLesson: e.target.value })}
                rows={2}
              />
            </div>

            {/* Row 11: Paragraphs — per-paragraph cards */}
            <div className="space-y-3">
              <Label>Story Paragraphs</Label>
              {form.paragraphs.map((paragraph, index) => {
                const hasProviderAudio =
                  !!paragraph.audio ||
                  (paragraph.audioProviders &&
                    Object.keys(paragraph.audioProviders).length > 0);
                return (
                <div
                  key={index}
                  className={`rounded-lg border p-3 space-y-2 ${
                    hasProviderAudio
                      ? "border-green-500/40 bg-green-50/50 dark:bg-green-950/20"
                      : "border-border bg-muted/30"
                  }`}
                >
                  {/* Paragraph header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        P{index + 1}
                      </span>
                      {hasProviderAudio && (
                        <Badge variant="outline" className="h-5 text-[10px] border-green-500/40 text-green-700 dark:text-green-400">
                          <Volume2 className="mr-1 h-2.5 w-2.5" />
                          Audio
                        </Badge>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeParagraph(index)}
                      disabled={form.paragraphs.length <= 1}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Paragraph text */}
                  <Textarea
                    value={paragraph.text}
                    onChange={(e) => updateParagraphText(index, e.target.value)}
                    rows={3}
                    dir={isRtl ? "rtl" : "ltr"}
                    className={`font-mono text-sm ${isRtl ? "text-right" : ""}`}
                    placeholder={`Paragraph ${index + 1} text...`}
                  />

                  {/* Audio controls — only when editing an existing story */}
                  {editing && paragraph.text.trim() && (() => {
                    const hasLegacyAudioOnly =
                      paragraph.audio &&
                      (!paragraph.audioProviders ||
                        Object.keys(paragraph.audioProviders).length === 0);

                    return (
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Legacy audio badge (audio field exists but no audioProviders) */}
                      {hasLegacyAudioOnly && (() => {
                        const legacyKey = audioKey(index, "legacy");
                        const isPlaying = playingAudio === legacyKey;
                        const isLoading = audioLoading[legacyKey];
                        return (
                          <div
                            className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1"
                          >
                            <Volume2 className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs font-medium">
                              Audio
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDuration(paragraph.audio!.durationSeconds)}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                isPlaying
                                  ? handleStopAudio()
                                  : handlePlayAudio(paragraph.audio!.url, legacyKey)
                              }
                            >
                              {isPlaying ? (
                                <Square className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={() => handleDeleteAudio(index, "polly")}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Trash2 className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        );
                      })()}

                      {/* Per-provider audio badges and generate buttons */}
                      {!hasLegacyAudioOnly &&
                        ttsProvidersForParagraph(form.lang, paragraph).map((provider) => {
                        const providerData = paragraph.audioProviders?.[provider];
                        const key = audioKey(index, provider);
                        const isLoading = audioLoading[key];
                        const isPlaying = playingAudio === key;

                        if (providerData) {
                          // Has audio for this provider
                          return (
                            <div
                              key={provider}
                              className="flex items-center gap-1.5 rounded-md border bg-background px-2 py-1"
                            >
                              <Volume2 className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs font-medium">
                                {ttsProviderLabel(provider)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatDuration(providerData.durationSeconds)}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() =>
                                  isPlaying
                                    ? handleStopAudio()
                                    : handlePlayAudio(providerData.url, key)
                                }
                              >
                                {isPlaying ? (
                                  <Square className="h-3 w-3" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-destructive"
                                onClick={() => handleDeleteAudio(index, provider)}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          );
                        }

                        // No audio for this provider — show generate button
                        return (
                          <Button
                            key={provider}
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => handleGenerateAudio(index, provider)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                              <Volume2 className="mr-1 h-3 w-3" />
                            )}
                            Generate {ttsProviderLabel(provider)}
                          </Button>
                        );
                      })}
                    </div>
                    );
                  })()}
                </div>
                );
              })}

              {/* Add paragraph + summary */}
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addParagraph}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Paragraph
                </Button>
                <p className="text-xs text-muted-foreground">
                  {form.paragraphs.filter((p) => p.text.trim()).length} paragraph(s)
                  {" "}&middot; ~{computeReadingTime(form.paragraphs)} min read
                </p>
              </div>
            </div>

            {/* Row 12: Source */}
            <div className="space-y-2">
              <Label htmlFor="story-source">Source / Attribution</Label>
              <Input
                id="story-source"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="e.g. Ovid, Metamorphoses"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>

            {formError && <p className="text-sm text-destructive">{formError}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Story Preview */}
      <Dialog open={!!previewStory} onOpenChange={(open) => !open && setPreviewStory(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {previewStory && (() => {
            const isRtl = RTL_LANGUAGES.has(previewStory.lang);
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl">
                    <span>{previewStory.icon}</span>
                    <span dir={isRtl ? "rtl" : undefined}>{previewStory.title}</span>
                  </DialogTitle>
                  {previewStory.subtitle && (
                    <DialogDescription dir={isRtl ? "rtl" : undefined} className="text-base">
                      {previewStory.subtitle}
                    </DialogDescription>
                  )}
                </DialogHeader>

                <div className="space-y-4">
                  {/* Meta info */}
                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary">{catLabel(previewStory.storyCategory)}</Badge>
                    {previewStory.era && <Badge variant="outline">{previewStory.era}</Badge>}
                    <Badge variant="outline">Tier {previewStory.tier}</Badge>
                    <Badge variant="outline">
                      {previewStory.readingTimeMinutes} min read
                    </Badge>
                    {previewStory.isFree && <Badge>Free</Badge>}
                    {previewStory.characters?.length > 0 && (
                      <Badge variant="outline">
                        {previewStory.characters.join(", ")}
                      </Badge>
                    )}
                  </div>

                  {/* Image */}
                  {previewStory.image && (
                    <div className="rounded-lg overflow-hidden border">
                      <img
                        src={previewStory.image}
                        alt={previewStory.title}
                        className="w-full h-auto max-h-80 object-cover"
                      />
                    </div>
                  )}

                  {/* Excerpt */}
                  {previewStory.excerpt && (
                    <p
                      dir={isRtl ? "rtl" : undefined}
                      className="text-muted-foreground italic border-l-4 border-muted pl-4"
                    >
                      {previewStory.excerpt}
                    </p>
                  )}

                  {/* Paragraphs */}
                  <div
                    dir={isRtl ? "rtl" : undefined}
                    className="space-y-4 text-[15px] leading-relaxed"
                  >
                    {previewStory.paragraphs?.map((p, i) => (
                      <p key={i}>{p.text}</p>
                    ))}
                  </div>

                  {/* Moral / Lesson */}
                  {previewStory.moralOrLesson && (
                    <div
                      dir={isRtl ? "rtl" : undefined}
                      className="bg-muted/50 rounded-lg p-4 text-sm"
                    >
                      <span className="font-semibold">Moral / Lesson: </span>
                      {previewStory.moralOrLesson}
                    </div>
                  )}

                  {/* Source */}
                  {previewStory.source && (
                    <p className="text-xs text-muted-foreground">
                      Source: {previewStory.source}
                    </p>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete story?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the{" "}
              <span className="font-semibold">
                {LANGUAGES.find((l) => l.code === deleteTarget?.lang)?.label ?? deleteTarget?.lang}
              </span>
              {" "}version of{" "}
              <span className="font-semibold">
                {deleteTarget?.icon} {deleteTarget?.title}
              </span>
              {" "}from site{" "}
              <span className="font-semibold">{deleteTarget?.siteTitle}</span>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
