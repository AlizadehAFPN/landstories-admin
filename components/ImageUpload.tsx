"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, Trash2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  id: string;
  type: "sites" | "stories";
  entityId: string;
  purpose?: "thumbnail" | "image";
  disabled?: boolean;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function ImageUpload({
  value,
  onChange,
  label,
  id,
  type,
  entityId,
  purpose = "image",
  disabled,
}: ImageUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [fileSize, setFileSize] = useState<number | null>(null);

  const handleUpload = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("type", type);
      body.append("entityId", entityId);
      body.append("purpose", purpose);

      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
      setFileSize(data.size ?? null);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!value) return;
    setError("");
    setDeleting(true);
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Delete failed");
        return;
      }

      onChange("");
      setFileSize(null);
    } catch {
      setError("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const hasPreview =
    value && (value.startsWith("http://") || value.startsWith("https://"));

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder="https://..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setFileSize(null);
        }}
        disabled={disabled}
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Upload"}
        </Button>
        {value && !disabled && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        )}
        {fileSize !== null && (
          <span className="text-xs text-muted-foreground">
            {formatSize(fileSize)}
          </span>
        )}
      </div>
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
      {hasPreview && (
        <a href={value} target="_blank" rel="noopener noreferrer">
          <img
            src={value}
            alt="Preview"
            className="mt-1 h-20 w-30 cursor-pointer rounded border object-cover transition-opacity hover:opacity-80"
          />
        </a>
      )}
    </div>
  );
}
