"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, X, GripVertical } from "lucide-react";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  type: "sites" | "stories";
  entityId: string;
  disabled?: boolean;
  maxImages?: number;
}

export function MultiImageUpload({
  value,
  onChange,
  label = "Gallery Images",
  type,
  entityId,
  disabled,
  maxImages = 10,
}: MultiImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);
      try {
        const body = new FormData();
        body.append("file", file);
        body.append("type", type);
        body.append("entityId", entityId);
        body.append("purpose", "image");

        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Upload failed");
          return;
        }

        onChange([...value, data.url]);
      } catch {
        setError("Upload failed");
      } finally {
        setUploading(false);
        if (fileRef.current) fileRef.current.value = "";
      }
    },
    [type, entityId, value, onChange],
  );

  const handleRemove = useCallback(
    async (index: number) => {
      const url = value[index];
      // Delete from S3 if it's an S3 URL
      if (url.includes(".s3.")) {
        try {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
          });
        } catch {
          // Continue removing from array even if S3 delete fails
        }
      }
      const next = value.filter((_, i) => i !== index);
      onChange(next);
    },
    [value, onChange],
  );

  // Drag-to-reorder handlers
  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (dragIndex === null || dragIndex === index) return;
      setDragOverIndex(index);
    },
    [dragIndex],
  );

  const handleDrop = useCallback(
    (index: number) => {
      if (dragIndex === null || dragIndex === index) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }
      const next = [...value];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(index, 0, moved);
      onChange(next);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, value, onChange],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, i) => (
            <div
              key={`${url}-${i}`}
              draggable={!disabled}
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={() => handleDrop(i)}
              onDragEnd={handleDragEnd}
              className={`group relative cursor-grab rounded-lg border transition-all ${
                dragIndex === i
                  ? "opacity-40 scale-95"
                  : dragOverIndex === i
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-border hover:border-primary/50"
              } ${i === 0 ? "ring-2 ring-blue-500/40" : ""}`}
            >
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="h-20 w-28 rounded-lg object-cover"
                draggable={false}
              />
              {/* Position badge */}
              <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                {i === 0 ? "Cover" : i + 1}
              </span>
              {/* Drag handle */}
              {!disabled && (
                <span className="absolute top-1 left-1 rounded bg-black/40 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-3 w-3 text-white" />
                </span>
              )}
              {/* Remove button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length === 0 && !disabled && (
        <p className="text-sm text-muted-foreground">
          No images yet. Upload images to create a gallery.
        </p>
      )}

      {!disabled && value.length < maxImages && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Add Image"}
        </Button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleUpload(f);
        }}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      {value.length > 1 && !disabled && (
        <p className="text-xs text-muted-foreground">
          Drag to reorder. First image is used as the cover thumbnail.
        </p>
      )}
    </div>
  );
}
