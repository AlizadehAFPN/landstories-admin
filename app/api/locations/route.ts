import { NextRequest, NextResponse } from "next/server";
import {
  ScanCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/lib/dynamo";
import { TABLE_COUNTRIES, TABLE_CITIES } from "@/lib/constants";
import type { CountryItem, CityItem } from "@/lib/types";

function getTable(type: string): string | null {
  if (type === "country") return TABLE_COUNTRIES;
  if (type === "city") return TABLE_CITIES;
  return null;
}

// GET /api/locations?type=country|city
export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const table = getTable(type ?? "");

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'country' or 'city'." },
      { status: 400 },
    );
  }

  try {
    const items: (CountryItem | CityItem)[] = [];
    let lastKey: Record<string, unknown> | undefined;

    do {
      const result = await docClient.send(
        new ScanCommand({ TableName: table, ExclusiveStartKey: lastKey }),
      );
      if (result.Items) {
        items.push(...(result.Items as (CountryItem | CityItem)[]));
      }
      lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (lastKey);

    items.sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json(items);
  } catch (error) {
    console.error("Locations GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}

// POST /api/locations — create or update a country or city
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, item } = body as { type: string; item: CountryItem | CityItem };
  const table = getTable(type);

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'country' or 'city'." },
      { status: 400 },
    );
  }

  if (!item?.id || !item?.name) {
    return NextResponse.json(
      { error: "Missing required fields: id, name" },
      { status: 400 },
    );
  }

  try {
    if (type === "country") {
      const c = item as CountryItem;
      await docClient.send(
        new PutCommand({
          TableName: table,
          Item: { id: c.id, name: c.name, flag: c.flag ?? "", disabled: c.disabled ?? true },
        }),
      );
    } else {
      const c = item as CityItem;
      if (!c.countryId) {
        return NextResponse.json(
          { error: "countryId is required for cities" },
          { status: 400 },
        );
      }
      await docClient.send(
        new PutCommand({
          TableName: table,
          Item: { id: c.id, name: c.name, countryId: c.countryId, disabled: c.disabled ?? true },
        }),
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Locations POST error:", error);
    return NextResponse.json(
      { error: "Failed to save location" },
      { status: 500 },
    );
  }
}

// PATCH /api/locations — toggle disabled status
export async function PATCH(request: NextRequest) {
  const { type, id, disabled } = (await request.json()) as {
    type: string;
    id: string;
    disabled: boolean;
  };

  if (!type || !id || typeof disabled !== "boolean") {
    return NextResponse.json(
      { error: "type, id, and disabled (boolean) are required" },
      { status: 400 },
    );
  }

  const table = getTable(type);
  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'country' or 'city'." },
      { status: 400 },
    );
  }

  try {
    await docClient.send(
      new UpdateCommand({
        TableName: table,
        Key: { id },
        UpdateExpression: "SET disabled = :d",
        ExpressionAttributeValues: { ":d": disabled },
      }),
    );

    // Cascade: when toggling a country, update all its cities too
    if (type === "country") {
      const cityItems: CityItem[] = [];
      let lastKey: Record<string, unknown> | undefined;

      do {
        const result = await docClient.send(
          new ScanCommand({
            TableName: TABLE_CITIES,
            FilterExpression: "countryId = :cid",
            ExpressionAttributeValues: { ":cid": id },
            ExclusiveStartKey: lastKey,
          }),
        );
        if (result.Items) {
          cityItems.push(...(result.Items as CityItem[]));
        }
        lastKey = result.LastEvaluatedKey as
          | Record<string, unknown>
          | undefined;
      } while (lastKey);

      await Promise.all(
        cityItems.map((city) =>
          docClient.send(
            new UpdateCommand({
              TableName: TABLE_CITIES,
              Key: { id: city.id },
              UpdateExpression: "SET disabled = :d",
              ExpressionAttributeValues: { ":d": disabled },
            }),
          ),
        ),
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Locations PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update location status" },
      { status: 500 },
    );
  }
}

// DELETE /api/locations — delete a country or city
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { type, id } = body as { type: string; id: string };
  const table = getTable(type);

  if (!table) {
    return NextResponse.json(
      { error: "Invalid type. Use 'country' or 'city'." },
      { status: 400 },
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: "Missing required field: id" },
      { status: 400 },
    );
  }

  try {
    await docClient.send(
      new DeleteCommand({ TableName: table, Key: { id } }),
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Locations DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 },
    );
  }
}
