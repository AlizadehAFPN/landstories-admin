import { NextRequest, NextResponse } from "next/server";
import {
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import {
  TABLE_EXPLORE_CATEGORIES,
  TABLE_STORY_CATEGORIES,
} from "@/lib/constants";
import type { CategoryItem } from "@/lib/types";

function getTable(type: string): string | null {
  if (type === "explore") return TABLE_EXPLORE_CATEGORIES;
  if (type === "story") return TABLE_STORY_CATEGORIES;
  return null;
}

// GET /api/categories?type=explore|story
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const table = getTable(type ?? "");

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'explore' or 'story'." },
      { status: 400 }
    );
  }

  try {
    const items: CategoryItem[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({
          TableName: table,
          ExclusiveStartKey: lastKey,
        })
      );
      if (result.Items) {
        items.push(...(result.Items as CategoryItem[]));
      }
      lastKey = result.LastEvaluatedKey as
        | Record<string, unknown>
        | undefined;
    } while (lastKey);

    items.sort((a, b) => a.order - b.order);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Categories GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories — create or update a category
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, item } = body as { type: string; item: CategoryItem };
  const table = getTable(type);

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'explore' or 'story'." },
      { status: 400 }
    );
  }

  if (!item?.id || !item?.titleKey || !item?.icon || item?.order == null) {
    return NextResponse.json(
      { error: "Missing required fields: id, titleKey, icon, order" },
      { status: 400 }
    );
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: table,
        Item: {
          id: item.id,
          titleKey: item.titleKey,
          icon: item.icon,
          order: item.order,
          ...(item.gradientColors ? { gradientColors: item.gradientColors } : {}),
        },
      })
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Categories POST error:", error);
    return NextResponse.json(
      { error: "Failed to save category" },
      { status: 500 }
    );
  }
}

// DELETE /api/categories — delete a category
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { type, id } = body as { type: string; id: string };
  const table = getTable(type);

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'explore' or 'story'." },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "Missing required field: id" },
      { status: 400 }
    );
  }

  try {
    await docClient.send(
      new DeleteCommand({
        TableName: table,
        Key: { id },
      })
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Categories DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
