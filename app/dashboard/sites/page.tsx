"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";
import { EXPLORE_CATEGORIES, LANGUAGES, RTL_LANGUAGES } from "@/lib/constants";
import { ImageUpload } from "@/components/ImageUpload";
import { MultiImageUpload } from "@/components/MultiImageUpload";
import type { AdminSite, ExploreCategory, LanguageCode, CountryItem, CityItem } from "@/lib/types";

interface SiteForm {
  siteId: string;
  lang: LanguageCode;
  title: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  lat: string;
  lng: string;
  category: ExploreCategory | "";
  countryId: string;
  cityId: string;
  unesco: boolean;
  // Extended fields
  description: string;
  nameLocal: string;
  constructionYear: string;
  builder: string;
  historicalPeriod: string;
  historicalSignificance: string;
  timeline: string;     // Newline-separated
  funFacts: string;     // Newline-separated
  tags: string;         // Comma-separated
}

const emptyForm: SiteForm = {
  siteId: "",
  lang: "en",
  title: "",
  shortDescription: "",
  thumbnail: "",
  images: [],
  lat: "",
  lng: "",
  category: "",
  countryId: "",
  cityId: "",
  unesco: false,
  description: "",
  nameLocal: "",
  constructionYear: "",
  builder: "",
  historicalPeriod: "",
  historicalSignificance: "",
  timeline: "",
  funFacts: "",
  tags: "",
};

/** Convert string[] to newline-separated text */
function arrayToLines(arr: string[] | undefined): string {
  return (arr ?? []).join("\n");
}

/** Convert newline-separated text to string[] */
function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
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

export default function SitesPage() {
  const [sites, setSites] = useState<AdminSite[]>([]);
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminSite | null>(null);
  const [translationSource, setTranslationSource] = useState<AdminSite | null>(null);
  const [form, setForm] = useState<SiteForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState<AdminSite | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [filterLang, setFilterLang] = useState<LanguageCode>("en");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterCity, setFilterCity] = useState<string>("all");
  const [filterStories, setFilterStories] = useState<string>("all");
  const [filterUnesco, setFilterUnesco] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("enabled");

  const langSites = useMemo(
    () => sites.filter((s) => s.lang === filterLang),
    [sites, filterLang],
  );

  // Lookup maps for countries/cities
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

  // Countries/cities that appear in current language's sites (for filter dropdowns)
  const usedCountryIds = useMemo(
    () => [...new Set(langSites.map((s) => s.countryId).filter(Boolean))].sort(),
    [langSites],
  );
  const usedCityIds = useMemo(
    () => [...new Set(langSites.map((s) => s.cityId).filter(Boolean))].sort(),
    [langSites],
  );

  // Cities filtered by selected country in the form
  const formCities = useMemo(
    () => form.countryId ? cities.filter((c) => c.countryId === form.countryId) : cities,
    [cities, form.countryId],
  );

  const hasActiveFilters = searchQuery || filterCategory !== "all" || filterCountry !== "all" || filterCity !== "all" || filterStories !== "all" || filterUnesco !== "all" || filterStatus !== "all";

  function clearAllFilters() {
    setSearchQuery("");
    setFilterCategory("all");
    setFilterCountry("all");
    setFilterCity("all");
    setFilterStories("all");
    setFilterUnesco("all");
    setFilterStatus("all");
  }

  // Filter sites by selected language + all filters
  const filteredSites = useMemo(
    () =>
      langSites
        .filter((s) => {
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            if (!s.title.toLowerCase().includes(q) && !s.siteId.toLowerCase().includes(q)) return false;
          }
          if (filterCategory !== "all" && s.category !== filterCategory) return false;
          if (filterCountry !== "all" && s.countryId !== filterCountry) return false;
          if (filterCity !== "all" && s.cityId !== filterCity) return false;
          if (filterStories === "none" && s.storyCount !== 0) return false;
          if (filterStories === "1-5" && (s.storyCount < 1 || s.storyCount > 5)) return false;
          if (filterStories === "6+" && s.storyCount < 6) return false;
          if (filterUnesco === "yes" && !s.unesco) return false;
          if (filterUnesco === "no" && s.unesco) return false;
          if (filterStatus === "enabled" && s.disabled) return false;
          if (filterStatus === "disabled" && !s.disabled) return false;
          return true;
        })
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [langSites, searchQuery, filterCategory, filterCountry, filterCity, filterStories, filterUnesco, filterStatus],
  );

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredSites.length / pageSize));
  const paginatedSites = useMemo(
    () => {
      const safePage = Math.min(currentPage, totalPages);
      return filteredSites.slice((safePage - 1) * pageSize, safePage * pageSize);
    },
    [filteredSites, currentPage, pageSize, totalPages],
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterLang, searchQuery, filterCategory, filterCountry, filterCity, filterStories, filterUnesco, filterStatus]);

  // Clamp page if sites were deleted
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Build a lookup of existing langs per site (for translation dropdown)
  const siteLangsMap = useMemo(() => {
    const map = new Map<string, LanguageCode[]>();
    for (const s of sites) {
      const langs = map.get(s.siteId) ?? [];
      langs.push(s.lang);
      map.set(s.siteId, langs);
    }
    return map;
  }, [sites]);

  const isRtl = RTL_LANGUAGES.has(form.lang);
  const isTranslation = !!translationSource;

  const fetchSites = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [sitesRes, countriesRes, citiesRes] = await Promise.all([
        fetch("/api/sites"),
        fetch("/api/locations?type=country"),
        fetch("/api/locations?type=city"),
      ]);
      if (!sitesRes.ok) throw new Error("Failed to fetch sites");
      setSites(await sitesRes.json());
      if (countriesRes.ok) setCountries(await countriesRes.json());
      if (citiesRes.ok) setCities(await citiesRes.json());
    } catch {
      setError("Failed to load sites.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  function openAdd() {
    setEditing(null);
    setTranslationSource(null);
    setForm({ ...emptyForm, lang: "en" });
    setFormError("");
    setDialogOpen(true);
  }

  function openEdit(site: AdminSite) {
    setEditing(site);
    setTranslationSource(null);
    setForm({
      siteId: site.siteId,
      lang: site.lang,
      title: site.title,
      shortDescription: site.shortDescription,
      thumbnail: site.thumbnail,
      images: site.images ?? [],
      lat: String(site.lat),
      lng: String(site.lng),
      category: site.category,
      countryId: site.countryId,
      cityId: site.cityId,
      unesco: site.unesco,
      description: site.description ?? "",
      nameLocal: site.nameLocal ?? "",
      constructionYear: site.constructionYear ?? "",
      builder: site.builder ?? "",
      historicalPeriod: site.historicalPeriod ?? "",
      historicalSignificance: site.historicalSignificance ?? "",
      timeline: arrayToLines(site.timeline),
      funFacts: arrayToLines(site.funFacts),
      tags: (site.tags ?? []).join(", "),
    });
    setFormError("");
    setDialogOpen(true);
  }

  function openTranslation(source: AdminSite, targetLang: LanguageCode) {
    setEditing(null);
    setTranslationSource(source);
    setForm({
      siteId: source.siteId,
      lang: targetLang,
      // Translatable fields — empty for user to fill
      title: "",
      shortDescription: "",
      description: "",
      nameLocal: "",
      historicalSignificance: "",
      timeline: "",
      funFacts: "",
      // Shared fields — pre-filled from English
      thumbnail: source.thumbnail,
      images: source.images ?? [],
      lat: String(source.lat),
      lng: String(source.lng),
      category: source.category,
      countryId: source.countryId,
      cityId: source.cityId,
      unesco: source.unesco,
      constructionYear: source.constructionYear ?? "",
      builder: source.builder ?? "",
      historicalPeriod: source.historicalPeriod ?? "",
      tags: (source.tags ?? []).join(", "),
    });
    setFormError("");
    setDialogOpen(true);
  }

  async function handleSave() {
    setFormError("");

    if (!form.siteId.trim() || !form.title.trim()) {
      setFormError("Site ID and title are required.");
      return;
    }

    if (!isTranslation && (!form.category || !form.countryId.trim())) {
      setFormError("Category and country ID are required for English sites.");
      return;
    }

    if (!/^[a-z0-9][a-z0-9_-]*$/.test(form.siteId.trim())) {
      setFormError("Site ID must be lowercase alphanumeric with hyphens/underscores.");
      return;
    }

    const lat = parseFloat(form.lat);
    const lng = parseFloat(form.lng);
    if (form.lat && isNaN(lat)) {
      setFormError("Latitude must be a valid number.");
      return;
    }
    if (form.lng && isNaN(lng)) {
      setFormError("Longitude must be a valid number.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        siteId: form.siteId.trim(),
        lang: form.lang,
        title: form.title.trim(),
        shortDescription: form.shortDescription.trim(),
        thumbnail: form.thumbnail.trim(),
        images: form.images,
        lat: form.lat ? lat : 0,
        lng: form.lng ? lng : 0,
        category: form.category,
        countryId: form.countryId.trim().toUpperCase(),
        cityId: form.cityId.trim().toLowerCase(),
        unesco: form.unesco,
        description: form.description.trim(),
        nameLocal: form.nameLocal.trim(),
        constructionYear: form.constructionYear.trim(),
        builder: form.builder.trim(),
        historicalPeriod: form.historicalPeriod.trim(),
        historicalSignificance: form.historicalSignificance.trim(),
        timeline: linesToArray(form.timeline),
        funFacts: linesToArray(form.funFacts),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/sites", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      setDialogOpen(false);
      await fetchSites();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save site.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/sites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: deleteTarget.siteId, lang: deleteTarget.lang }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      await fetchSites();
    } catch {
      setError("Failed to delete site.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleToggleDisabled(site: AdminSite) {
    const newDisabled = !site.disabled;
    // Optimistic update
    setSites((prev) =>
      prev.map((s) =>
        s.siteId === site.siteId && s.lang === site.lang
          ? { ...s, disabled: newDisabled }
          : s
      )
    );
    try {
      const res = await fetch("/api/sites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: site.siteId, lang: site.lang, disabled: newDisabled }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch {
      // Revert on failure
      setSites((prev) =>
        prev.map((s) =>
          s.siteId === site.siteId && s.lang === site.lang
            ? { ...s, disabled: !newDisabled }
            : s
        )
      );
      setError("Failed to update site status.");
    }
  }

  const catLabel = (id: string) =>
    EXPLORE_CATEGORIES.find((c) => c.id === id)?.label ?? id;

  const countryLabel = (id: string) => {
    const c = countryMap.get(id);
    return c ? `${c.flag || ""} ${c.name}`.trim() : id;
  };

  const cityLabel = (id: string) => cityMap.get(id)?.name ?? id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Sites</h1>
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
          Add Site
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
                {EXPLORE_CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
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
            <Select value={filterStories} onValueChange={setFilterStories}>
              <SelectTrigger className="w-[130px] h-9">
                <SelectValue placeholder="Stories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stories</SelectItem>
                <SelectItem value="none">No Stories</SelectItem>
                <SelectItem value="1-5">1 – 5</SelectItem>
                <SelectItem value="6+">6+</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterUnesco} onValueChange={setFilterUnesco}>
              <SelectTrigger className="w-[120px] h-9">
                <SelectValue placeholder="UNESCO" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All UNESCO</SelectItem>
                <SelectItem value="yes">UNESCO</SelectItem>
                <SelectItem value="no">Non-UNESCO</SelectItem>
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
              Showing {filteredSites.length} of {langSites.length} sites
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Heritage Sites</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredSites.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No sites found for {LANGUAGES.find((l) => l.code === filterLang)?.label ?? filterLang}.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead className="text-center">Stories</TableHead>
                    <TableHead className="text-center">UNESCO</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="w-36 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedSites.map((site) => (
                    <TableRow key={`${site.siteId}-${site.lang}`}>
                      <TableCell className="font-medium">
                        {site.title}
                        <div className="text-xs text-muted-foreground font-mono">
                          {site.siteId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{catLabel(site.category)}</Badge>
                      </TableCell>
                      <TableCell>{countryLabel(site.countryId)}</TableCell>
                      <TableCell>{cityLabel(site.cityId)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{site.storyCount}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {site.unesco ? (
                          <Badge>Yes</Badge>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={!site.disabled}
                          onCheckedChange={() => handleToggleDisabled(site)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <LanguageAddDropdown
                            existingLangs={siteLangsMap.get(site.siteId) ?? [site.lang]}
                            onSelect={(targetLang) => openTranslation(site, targetLang)}
                          />
                          <Button variant="ghost" size="icon" onClick={() => openEdit(site)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(site)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(Math.min(currentPage, totalPages) - 1) * pageSize + 1}–{Math.min(Math.min(currentPage, totalPages) * pageSize, filteredSites.length)} of {filteredSites.length} sites
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {translationSource
                ? `Add ${LANGUAGES.find((l) => l.code === form.lang)?.label} Translation`
                : editing
                ? "Edit Site"
                : "Add Site"}
            </DialogTitle>
            <DialogDescription>
              {translationSource
                ? `Translate "${translationSource.title}" into ${LANGUAGES.find((l) => l.code === form.lang)?.label}.`
                : editing
                ? `Update the site details. (${LANGUAGES.find((l) => l.code === form.lang)?.label})`
                : "Create a new heritage site."}
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
                  Shared fields (thumbnail, location, category, country, city, UNESCO, construction year, builder, period, tags) are pre-filled.
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
                disabled={!!editing || isTranslation}
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

            {/* Basic Info */}
            <div className="space-y-2">
              <Label htmlFor="site-id">Site ID</Label>
              <Input
                id="site-id"
                placeholder="e.g. hagia-sophia"
                value={form.siteId}
                onChange={(e) => setForm({ ...form, siteId: e.target.value })}
                disabled={!!editing || isTranslation}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Title</Label>
                <Input
                  id="site-title"
                  dir={isRtl ? "rtl" : "ltr"}
                  placeholder="e.g. Hagia Sophia"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-name-local">Local Name</Label>
                <Input
                  id="site-name-local"
                  dir={isRtl ? "rtl" : "ltr"}
                  placeholder="e.g. Ayasofya"
                  value={form.nameLocal}
                  onChange={(e) => setForm({ ...form, nameLocal: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-desc">Short Description</Label>
              <Textarea
                id="site-desc"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="Brief description of the site..."
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                rows={3}
              />
            </div>

            <MultiImageUpload
              label="Gallery Images"
              value={form.images}
              onChange={(urls) => setForm({ ...form, images: urls, thumbnail: urls[0] ?? "" })}
              type="sites"
              entityId={form.siteId}
              disabled={isTranslation}
            />
            {form.images.length > 0 && form.thumbnail && (
              <p className="text-xs text-muted-foreground">
                Cover thumbnail auto-set from first gallery image.
              </p>
            )}
            {form.images.length === 0 && (
              <ImageUpload
                id="site-thumb"
                label="Thumbnail (standalone)"
                value={form.thumbnail}
                onChange={(url) => setForm({ ...form, thumbnail: url })}
                type="sites"
                entityId={form.siteId}
                purpose="thumbnail"
                disabled={isTranslation}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-lat">Latitude</Label>
                <Input
                  id="site-lat"
                  type="number"
                  step="any"
                  placeholder="41.0086"
                  value={form.lat}
                  onChange={(e) => setForm({ ...form, lat: e.target.value })}
                  disabled={isTranslation}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-lng">Longitude</Label>
                <Input
                  id="site-lng"
                  type="number"
                  step="any"
                  placeholder="28.9802"
                  value={form.lng}
                  onChange={(e) => setForm({ ...form, lng: e.target.value })}
                  disabled={isTranslation}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v as ExploreCategory })}
                disabled={isTranslation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {EXPLORE_CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country</Label>
                <Select
                  value={form.countryId}
                  onValueChange={(v) => setForm({ ...form, countryId: v, cityId: "" })}
                  disabled={isTranslation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.flag || ""} {c.name} ({c.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Select
                  value={form.cityId}
                  onValueChange={(v) => setForm({ ...form, cityId: v })}
                  disabled={isTranslation || !form.countryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={form.countryId ? "Select city" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {formCities.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="site-unesco"
                checked={form.unesco}
                onCheckedChange={(v) => setForm({ ...form, unesco: v })}
                disabled={isTranslation}
              />
              <Label htmlFor="site-unesco">UNESCO World Heritage Site</Label>
            </div>

            <Separator />

            {/* Extended Detail Fields */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Site Details
            </h3>

            <div className="space-y-2">
              <Label htmlFor="site-description">Full Description</Label>
              <Textarea
                id="site-description"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="Detailed description of the site..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={5}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-construction">Construction Year</Label>
                <Input
                  id="site-construction"
                  placeholder="e.g. 1221"
                  value={form.constructionYear}
                  onChange={(e) => setForm({ ...form, constructionYear: e.target.value })}
                  disabled={isTranslation}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-builder">Builder</Label>
                <Input
                  id="site-builder"
                  placeholder="e.g. Sultan Alaeddin Keykubad I"
                  value={form.builder}
                  onChange={(e) => setForm({ ...form, builder: e.target.value })}
                  disabled={isTranslation}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-period">Historical Period</Label>
              <Input
                id="site-period"
                placeholder="e.g. Seljuk Sultanate (13th century)"
                value={form.historicalPeriod}
                onChange={(e) => setForm({ ...form, historicalPeriod: e.target.value })}
                disabled={isTranslation}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-significance">Historical Significance</Label>
              <Textarea
                id="site-significance"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="Why this site is historically significant..."
                value={form.historicalSignificance}
                onChange={(e) => setForm({ ...form, historicalSignificance: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-timeline">
                Timeline
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  (one event per line)
                </span>
              </Label>
              <Textarea
                id="site-timeline"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="1221 – Sultan conquers the fortress&#10;1226 – Red Tower construction begins&#10;..."
                value={form.timeline}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                rows={5}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-funfacts">
                Fun Facts
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  (one fact per line)
                </span>
              </Label>
              <Textarea
                id="site-funfacts"
                dir={isRtl ? "rtl" : "ltr"}
                placeholder="The castle walls stretch 6.5 km&#10;The cave maintains a constant 22°C&#10;..."
                value={form.funFacts}
                onChange={(e) => setForm({ ...form, funFacts: e.target.value })}
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="site-tags">Tags (comma-separated)</Label>
              <Input
                id="site-tags"
                placeholder="e.g. medieval, fortress, seljuk, panoramic"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                disabled={isTranslation}
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

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete site?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the{" "}
              <span className="font-semibold">
                {LANGUAGES.find((l) => l.code === deleteTarget?.lang)?.label ?? deleteTarget?.lang}
              </span>
              {" "}version of{" "}
              <span className="font-semibold">{deleteTarget?.title}</span>
              {deleteTarget?.lang === "en" && deleteTarget?.storyCount ? (
                <> (has {deleteTarget.storyCount} stories in the Story table)</>
              ) : null}
              . This action cannot be undone.
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
