"use client";

import { useEffect, useState, useCallback } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, MapPin, BookOpen } from "lucide-react";
import type { CategoryItem } from "@/lib/types";

type CategoryType = "explore" | "story";

interface FormState {
  id: string;
  titleKey: string;
  icon: string;
  order: string;
  gradientFrom: string;
  gradientTo: string;
}

const emptyForm: FormState = { id: "", titleKey: "", icon: "", order: "", gradientFrom: "", gradientTo: "" };

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<CategoryType>("explore");
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/categories?type=${activeTab}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setItems(data);
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openAdd() {
    setEditing(null);
    const nextOrder = items.length > 0 ? Math.max(...items.map((i) => i.order)) + 1 : 1;
    setForm({ ...emptyForm, order: String(nextOrder), gradientFrom: "", gradientTo: "" });
    setFormError("");
    setDialogOpen(true);
  }

  function openEdit(item: CategoryItem) {
    setEditing(item);
    setForm({
      id: item.id,
      titleKey: item.titleKey,
      icon: item.icon,
      order: String(item.order),
      gradientFrom: item.gradientColors?.[0] ?? "",
      gradientTo: item.gradientColors?.[1] ?? "",
    });
    setFormError("");
    setDialogOpen(true);
  }

  async function handleSave() {
    setFormError("");

    if (!form.id.trim() || !form.titleKey.trim() || !form.icon.trim() || !form.order.trim()) {
      setFormError("All fields are required.");
      return;
    }

    const order = parseInt(form.order, 10);
    if (isNaN(order) || order < 1) {
      setFormError("Order must be a positive number.");
      return;
    }

    // Validate id format: lowercase, underscores only
    if (!/^[a-z][a-z0-9_]*$/.test(form.id.trim())) {
      setFormError("ID must be lowercase letters, numbers, and underscores (start with letter).");
      return;
    }

    // If adding new, check for duplicate id
    if (!editing && items.some((i) => i.id === form.id.trim())) {
      setFormError("A category with this ID already exists.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          item: {
            id: form.id.trim(),
            titleKey: form.titleKey.trim(),
            icon: form.icon.trim(),
            order,
            ...(form.gradientFrom && form.gradientTo
              ? { gradientColors: [form.gradientFrom.trim(), form.gradientTo.trim()] }
              : {}),
          },
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }
      setDialogOpen(false);
      await fetchItems();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save category.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, id: deleteTarget.id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteTarget(null);
      await fetchItems();
    } catch {
      setError("Failed to delete category.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "explore" ? "default" : "outline"}
          onClick={() => setActiveTab("explore")}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Explore Categories
        </Button>
        <Button
          variant={activeTab === "story" ? "default" : "outline"}
          onClick={() => setActiveTab("story")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Story Categories
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {activeTab === "explore" ? "Explore" : "Story"} Categories
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
          ) : items.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No categories found. Add one to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Order</TableHead>
                  <TableHead className="w-16">Icon</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Title Key</TableHead>
                  <TableHead>Gradient</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="secondary">{item.order}</Badge>
                    </TableCell>
                    <TableCell className="text-xl">{item.icon}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.id}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.titleKey}
                    </TableCell>
                    <TableCell>
                      {item.gradientColors ? (
                        <div className="flex gap-1">
                          <div
                            className="h-5 w-5 rounded border"
                            style={{ backgroundColor: item.gradientColors[0] }}
                            title={item.gradientColors[0]}
                          />
                          <div
                            className="h-5 w-5 rounded border"
                            style={{ backgroundColor: item.gradientColors[1] }}
                            title={item.gradientColors[1]}
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(item)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the category details below."
                : `Add a new ${activeTab} category.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cat-id">ID</Label>
              <Input
                id="cat-id"
                placeholder="e.g. ancient_ruins"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={!!editing}
              />
              {editing && (
                <p className="text-xs text-muted-foreground">
                  ID cannot be changed after creation.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-titleKey">Title Key</Label>
              <Input
                id="cat-titleKey"
                placeholder="e.g. explore.categories.ancientRuins"
                value={form.titleKey}
                onChange={(e) =>
                  setForm({ ...form, titleKey: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cat-icon">Icon (emoji)</Label>
                <Input
                  id="cat-icon"
                  placeholder="e.g. 🏛️"
                  value={form.icon}
                  onChange={(e) =>
                    setForm({ ...form, icon: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-order">Order</Label>
                <Input
                  id="cat-order"
                  type="number"
                  min={1}
                  placeholder="1"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cat-grad-from">Gradient From</Label>
                <div className="flex gap-2">
                  <Input
                    id="cat-grad-from"
                    placeholder="#7C3AED"
                    value={form.gradientFrom}
                    onChange={(e) =>
                      setForm({ ...form, gradientFrom: e.target.value })
                    }
                  />
                  {form.gradientFrom && (
                    <div
                      className="h-9 w-9 rounded border shrink-0"
                      style={{ backgroundColor: form.gradientFrom }}
                    />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cat-grad-to">Gradient To</Label>
                <div className="flex gap-2">
                  <Input
                    id="cat-grad-to"
                    placeholder="#5B21B6"
                    value={form.gradientTo}
                    onChange={(e) =>
                      setForm({ ...form, gradientTo: e.target.value })
                    }
                  />
                  {form.gradientTo && (
                    <div
                      className="h-9 w-9 rounded border shrink-0"
                      style={{ backgroundColor: form.gradientTo }}
                    />
                  )}
                </div>
              </div>
            </div>

            {formError && (
              <p className="text-sm text-destructive">{formError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold">{deleteTarget?.icon} {deleteTarget?.id}</span>{" "}
              from the {activeTab} categories table. This action cannot be undone.
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
