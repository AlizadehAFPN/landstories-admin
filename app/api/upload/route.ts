import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { IMAGES_S3_BUCKET } from "@/lib/constants";

const region = process.env.AWS_REGION ?? "eu-north-1";
const s3 = new S3Client({ region });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null; // "sites" | "stories"
    const entityId = formData.get("entityId") as string | null;
    const purpose = formData.get("purpose") as string | null; // "thumbnail" | "image"

    if (!file || !type || !entityId) {
      return NextResponse.json(
        { error: "Missing file, type, or entityId" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const isThumbnail = purpose === "thumbnail";
    const width = isThumbnail ? 600 : 900;
    const height = isThumbnail ? 400 : 600;
    const quality = isThumbnail ? 55 : 65;

    const webpBuffer = await sharp(buffer)
      .resize(width, height, { fit: "cover" })
      .webp({ quality, effort: 4, smartSubsample: true })
      .toBuffer();

    const key = `images/${type}/${entityId}/${Date.now()}.webp`;

    await s3.send(
      new PutObjectCommand({
        Bucket: IMAGES_S3_BUCKET,
        Key: key,
        Body: webpBuffer,
        ContentType: "image/webp",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );

    const url = `https://${IMAGES_S3_BUCKET}.s3.${region}.amazonaws.com/${key}`;

    return NextResponse.json({ url, size: webpBuffer.length });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Image upload error:", msg);
    return NextResponse.json(
      { error: msg },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    // Extract S3 key from the full URL
    const prefix = `https://${IMAGES_S3_BUCKET}.s3.${region}.amazonaws.com/`;
    if (!url.startsWith(prefix)) {
      // Not an S3 image we manage — just clear the field, nothing to delete
      return NextResponse.json({ ok: true });
    }

    const key = url.slice(prefix.length);

    await s3.send(
      new DeleteObjectCommand({
        Bucket: IMAGES_S3_BUCKET,
        Key: key,
      }),
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Image delete error:", err);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 },
    );
  }
}
