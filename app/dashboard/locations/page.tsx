"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Globe2, Building2 } from "lucide-react";
import type { CountryItem, CityItem, AdminSite } from "@/lib/types";

type LocationTab = "country" | "city";

// ── Country form ──
interface CountryForm {
  id: string;
  name: string;
  flag: string;
}
const emptyCountryForm: CountryForm = { id: "", name: "", flag: "" };

// ── City form ──
interface CityForm {
  id: string;
  name: string;
  countryId: string;
}
const emptyCityForm: CityForm = { id: "", name: "", countryId: "" };

export default function LocationsPage() {
  const [activeTab, setActiveTab] = useState<LocationTab>("country");

  // Data
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [sites, setSites] = useState<AdminSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Country dialog
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<CountryItem | null>(null);
  const [countryForm, setCountryForm] = useState<CountryForm>(emptyCountryForm);
  const [savingCountry, setSavingCountry] = useState(false);
  const [countryFormError, setCountryFormError] = useState("");

  // City dialog
  const [cityDialogOpen, setCityDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityItem | null>(null);
  const [cityForm, setCityForm] = useState<CityForm>(emptyCityForm);
  const [savingCity, setSavingCity] = useState(false);
  const [cityFormError, setCityFormError] = useState("");

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<{ type: LocationTab; item: CountryItem | CityItem } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Country lookup for city table display
  const countryMap = useMemo(() => {
    const map = new Map<string, CountryItem>();
    for (const c of countries) map.set(c.id, c);
    return map;
  }, [countries]);

  // Count sites and stories per country
  const countryCountsMap = useMemo(() => {
    const map = new Map<string, { sites: number; stories: number }>();
    for (const site of sites) {
      if (!site.countryId) continue;
      const entry = map.get(site.countryId) ?? { sites: 0, stories: 0 };
      entry.sites += 1;
      entry.stories += site.storyCount;
      map.set(site.countryId, entry);
    }
    return map;
  }, [sites]);

  // Count sites and stories per city
  const cityCountsMap = useMemo(() => {
    const map = new Map<string, { sites: number; stories: number }>();
    for (const site of sites) {
      if (!site.cityId) continue;
      const entry = map.get(site.cityId) ?? { sites: 0, stories: 0 };
      entry.sites += 1;
      entry.stories += site.storyCount;
      map.set(site.cityId, entry);
    }
    return map;
  }, [sites]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [cRes, ciRes, sRes] = await Promise.all([
        fetch("/api/locations?type=country"),
        fetch("/api/locations?type=city"),
        fetch("/api/sites?lang=en"),
      ]);
      if (!cRes.ok || !ciRes.ok) throw new Error("Failed to fetch");
      setCountries(await cRes.json());
      setCities(await ciRes.json());
      if (sRes.ok) setSites(await sRes.json());
    } catch {
      setError("Failed to load locations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Country handlers ──

  function openAddCountry() {
    setEditingCountry(null);
    setCountryForm(emptyCountryForm);
    setCountryFormError("");
    setCountryDialogOpen(true);
  }

  function openEditCountry(item: CountryItem) {
    setEditingCountry(item);
    setCountryForm({ id: item.id, name: item.name, flag: item.flag });
    setCountryFormError("");
    setCountryDialogOpen(true);
  }

  async function handleSaveCountry() {
    setCountryFormError("");
    if (!countryForm.id.trim() || !countryForm.name.trim()) {
      setCountryFormError("Code and name are required.");
      return;
    }
    if (!/^[A-Z]{2}$/.test(countryForm.id.trim())) {
      setCountryFormError("Code must be a 2-letter uppercase ISO code (e.g. TR).");
      return;
    }
    if (!editingCountry && countries.some((c) => c.id === countryForm.id.trim())) {
      setCountryFormError("A country with this code already exists.");
      return;
    }

    setSavingCountry(true);
    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "country",
          item: {
            id: countryForm.id.trim(),
            name: countryForm.name.trim(),
            flag: countryForm.flag.trim(),
            ...(editingCountry && { disabled: editingCountry.disabled }),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
      setCountryDialogOpen(false);
      await fetchData();
    } catch (err) {
      setCountryFormError(err instanceof Error ? err.message : "Failed to save country.");
    } finally {
      setSavingCountry(false);
    }
  }

  // ── City handlers ──

  function openAddCity() {
    setEditingCity(null);
    setCityForm(emptyCityForm);
    setCityFormError("");
    setCityDialogOpen(true);
  }

  function openEditCity(item: CityItem) {
    setEditingCity(item);
    setCityForm({ id: item.id, name: item.name, countryId: item.countryId });
    setCityFormError("");
    setCityDialogOpen(true);
  }

  async function handleSaveCity() {
    setCityFormError("");
    if (!cityForm.id.trim() || !cityForm.name.trim() || !cityForm.countryId) {
      setCityFormError("Slug, name, and country are required.");
      return;
    }
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(cityForm.id.trim())) {
      setCityFormError("Slug must be lowercase alphanumeric with hyphens/underscores.");
      return;
    }
    if (!editingCity && cities.some((c) => c.id === cityForm.id.trim())) {
      setCityFormError("A city with this slug already exists.");
      return;
    }

    setSavingCity(true);
    try {
      const res = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "city",
          item: {
            id: cityForm.id.trim(),
            name: cityForm.name.trim(),
            countryId: cityForm.countryId,
            ...(editingCity && { disabled: editingCity.disabled }),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
      setCityDialogOpen(false);
      await fetchData();
    } catch (err) {
      setCityFormError(err instanceof Error ? err.message : "Failed to save city.");
    } finally {
      setSavingCity(false);
    }
  }

  // ── Delete handler ──

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/locations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: deleteTarget.type, id: deleteTarget.item.id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      await fetchData();
    } catch {
      setError(`Failed to delete ${deleteTarget.type}.`);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  // ── Toggle handlers ──

  async function handleToggleCountryDisabled(country: CountryItem) {
    const newDisabled = !country.disabled;
    setCountries((prev) =>
      prev.map((c) => (c.id === country.id ? { ...c, disabled: newDisabled } : c)),
    );
    setCities((prev) =>
      prev.map((c) => (c.countryId === country.id ? { ...c, disabled: newDisabled } : c)),
    );
    try {
      const res = await fetch("/api/locations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "country", id: country.id, disabled: newDisabled }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCountries((prev) =>
        prev.map((c) => (c.id === country.id ? { ...c, disabled: !newDisabled } : c)),
      );
      setCities((prev) =>
        prev.map((c) => (c.countryId === country.id ? { ...c, disabled: !newDisabled } : c)),
      );
      setError("Failed to update country status.");
    }
  }

  async function handleToggleCityDisabled(city: CityItem) {
    const newDisabled = !city.disabled;
    setCities((prev) =>
      prev.map((c) => (c.id === city.id ? { ...c, disabled: newDisabled } : c)),
    );
    try {
      const res = await fetch("/api/locations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "city", id: city.id, disabled: newDisabled }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCities((prev) =>
        prev.map((c) => (c.id === city.id ? { ...c, disabled: !newDisabled } : c)),
      );
      setError("Failed to update city status.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Locations</h1>
        <Button onClick={activeTab === "country" ? openAddCountry : openAddCity}>
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab === "country" ? "Country" : "City"}
        </Button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "country" ? "default" : "outline"}
          onClick={() => setActiveTab("country")}
        >
          <Globe2 className="mr-2 h-4 w-4" />
          Countries
        </Button>
        <Button
          variant={activeTab === "city" ? "default" : "outline"}
          onClick={() => setActiveTab("city")}
        >
          <Building2 className="mr-2 h-4 w-4" />
          Cities
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {activeTab === "country" ? "Countries" : "Cities"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="mb-4 text-sm text-destructive">{error}</p>}

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : activeTab === "country" ? (
            countries.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                No countries found. Add one to get started.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Flag</TableHead>
                    <TableHead className="w-20">Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-16 text-center">Sites</TableHead>
                    <TableHead className="w-20 text-center">Stories</TableHead>
                    <TableHead className="w-20 text-center">Enabled</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countries.map((c) => {
                    const counts = countryCountsMap.get(c.id) ?? { sites: 0, stories: 0 };
                    return (
                      <TableRow key={c.id} className={c.disabled ? "opacity-60" : ""}>
                        <TableCell className="text-xl">{c.flag || "—"}</TableCell>
                        <TableCell className="font-mono text-sm">{c.id}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{counts.sites}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{counts.stories}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={!c.disabled}
                            onCheckedChange={() => handleToggleCountryDisabled(c)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEditCountry(c)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: "country", item: c })}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          ) : cities.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No cities found. Add one to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead className="w-16 text-center">Sites</TableHead>
                  <TableHead className="w-20 text-center">Stories</TableHead>
                  <TableHead className="w-20 text-center">Enabled</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cities.map((c) => {
                  const country = countryMap.get(c.countryId);
                  const counts = cityCountsMap.get(c.id) ?? { sites: 0, stories: 0 };
                  return (
                    <TableRow key={c.id} className={c.disabled ? "opacity-60" : ""}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">{c.id}</TableCell>
                      <TableCell>
                        {country ? `${country.flag || ""} ${country.name}`.trim() : c.countryId}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{counts.sites}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">{counts.stories}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={!c.disabled}
                          onCheckedChange={() => handleToggleCityDisabled(c)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditCity(c)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget({ type: "city", item: c })}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Country Dialog */}
      <Dialog open={countryDialogOpen} onOpenChange={setCountryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCountry ? "Edit Country" : "Add Country"}</DialogTitle>
            <DialogDescription>
              {editingCountry ? "Update the country details." : "Add a new country."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-[100px_1fr] gap-4">
              <div className="space-y-2">
                <Label htmlFor="country-id">Code</Label>
                <Input
                  id="country-id"
                  placeholder="TR"
                  value={countryForm.id}
                  onChange={(e) => setCountryForm({ ...countryForm, id: e.target.value.toUpperCase() })}
                  maxLength={2}
                  disabled={!!editingCountry}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country-name">Name</Label>
                <Input
                  id="country-name"
                  placeholder="Turkey"
                  value={countryForm.name}
                  onChange={(e) => setCountryForm({ ...countryForm, name: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-flag">Flag (emoji)</Label>
              <Input
                id="country-flag"
                placeholder="🇹🇷"
                value={countryForm.flag}
                onChange={(e) => setCountryForm({ ...countryForm, flag: e.target.value })}
                className="w-24"
              />
            </div>
            {countryFormError && <p className="text-sm text-destructive">{countryFormError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCountryDialogOpen(false)} disabled={savingCountry}>
              Cancel
            </Button>
            <Button onClick={handleSaveCountry} disabled={savingCountry}>
              {savingCountry ? "Saving..." : editingCountry ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* City Dialog */}
      <Dialog open={cityDialogOpen} onOpenChange={setCityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCity ? "Edit City" : "Add City"}</DialogTitle>
            <DialogDescription>
              {editingCity ? "Update the city details." : "Add a new city."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="city-id">Slug</Label>
              <Input
                id="city-id"
                placeholder="istanbul"
                value={cityForm.id}
                onChange={(e) => setCityForm({ ...cityForm, id: e.target.value })}
                disabled={!!editingCity}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city-name">Name</Label>
              <Input
                id="city-name"
                placeholder="Istanbul"
                value={cityForm.name}
                onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Select
                value={cityForm.countryId}
                onValueChange={(v) => setCityForm({ ...cityForm, countryId: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
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
            {cityFormError && <p className="text-sm text-destructive">{cityFormError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCityDialogOpen(false)} disabled={savingCity}>
              Cancel
            </Button>
            <Button onClick={handleSaveCity} disabled={savingCity}>
              {savingCity ? "Saving..." : editingCity ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteTarget?.type}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold">
                {deleteTarget?.type === "country"
                  ? `${(deleteTarget.item as CountryItem).flag || ""} ${deleteTarget.item.name}`.trim()
                  : deleteTarget?.item.name}
              </span>
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
