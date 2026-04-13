import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getAnalyticsClient(): BetaAnalyticsDataClient {
  // Option 1: Base64-encoded service account (for production/Vercel)
  const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (base64) {
    const credentials = JSON.parse(
      Buffer.from(base64, "base64").toString("utf-8")
    );
    return new BetaAnalyticsDataClient({ credentials });
  }

  // Option 2: Service account JSON file
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  if (filePath) {
    return new BetaAnalyticsDataClient({ keyFilename: filePath });
  }

  // Option 3: Application Default Credentials (gcloud auth application-default login)
  return new BetaAnalyticsDataClient();
}

const propertyId = process.env.GA4_PROPERTY_ID;

// GET /api/analytics?report=overview|timeseries|top-content|countries|platforms&days=30
export async function GET(request: NextRequest) {
  if (!propertyId) {
    return NextResponse.json(
      { error: "GA4_PROPERTY_ID not configured" },
      { status: 500 }
    );
  }

  const report = request.nextUrl.searchParams.get("report") ?? "overview";
  const days = Number(request.nextUrl.searchParams.get("days") ?? "30");
  const property = `properties/${propertyId}`;

  try {
    const client = getAnalyticsClient();

    switch (report) {
      case "overview": {
        const [response] = await client.runReport({
          property,
          dateRanges: [
            { startDate: "7daysAgo", endDate: "today" },
            { startDate: "30daysAgo", endDate: "today" },
          ],
          metrics: [
            { name: "activeUsers" },
            { name: "newUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
            { name: "averageSessionDuration" },
            { name: "totalUsers" },
          ],
        });

        // GA4 returns one row per dateRange when no dimensions are specified
        const metrics7d =
          response.rows?.[0]?.metricValues?.map((m) =>
            Number(m.value ?? 0)
          ) ?? [];
        const metrics30d =
          response.rows?.[1]?.metricValues?.map((m) =>
            Number(m.value ?? 0)
          ) ?? [];

        return NextResponse.json({
          activeUsers7d: metrics7d[0] ?? 0,
          newUsers7d: metrics7d[1] ?? 0,
          sessions7d: metrics7d[2] ?? 0,
          screenPageViews7d: metrics7d[3] ?? 0,
          avgSessionDuration7d: metrics7d[4] ?? 0,
          totalUsers: metrics7d[5] ?? 0,
          activeUsers30d: metrics30d[0] ?? 0,
          newUsers30d: metrics30d[1] ?? 0,
          sessions30d: metrics30d[2] ?? 0,
          screenPageViews30d: metrics30d[3] ?? 0,
          avgSessionDuration30d: metrics30d[4] ?? 0,
        });
      }

      case "timeseries": {
        const [response] = await client.runReport({
          property,
          dateRanges: [
            { startDate: `${days}daysAgo`, endDate: "today" },
          ],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "screenPageViews" },
          ],
          orderBys: [
            {
              dimension: {
                orderType: "ALPHANUMERIC",
                dimensionName: "date",
              },
            },
          ],
        });

        const rows = (response.rows ?? []).map((r) => ({
          date: r.dimensionValues?.[0]?.value ?? "",
          activeUsers: Number(r.metricValues?.[0]?.value ?? 0),
          sessions: Number(r.metricValues?.[1]?.value ?? 0),
          screenPageViews: Number(r.metricValues?.[2]?.value ?? 0),
        }));

        return NextResponse.json({ rows });
      }

      case "top-content": {
        const [response] = await client.runReport({
          property,
          dateRanges: [
            { startDate: `${days}daysAgo`, endDate: "today" },
          ],
          dimensions: [{ name: "pageTitle" }],
          metrics: [
            { name: "screenPageViews" },
            { name: "activeUsers" },
          ],
          orderBys: [
            { metric: { metricName: "screenPageViews" }, desc: true },
          ],
          limit: 20,
        });

        const rows = (response.rows ?? []).map((r) => ({
          pageTitle: r.dimensionValues?.[0]?.value ?? "",
          screenPageViews: Number(r.metricValues?.[0]?.value ?? 0),
          activeUsers: Number(r.metricValues?.[1]?.value ?? 0),
        }));

        return NextResponse.json({ rows });
      }

      case "countries": {
        const [response] = await client.runReport({
          property,
          dateRanges: [
            { startDate: `${days}daysAgo`, endDate: "today" },
          ],
          dimensions: [{ name: "country" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [
            { metric: { metricName: "activeUsers" }, desc: true },
          ],
          limit: 30,
        });

        const rows = (response.rows ?? []).map((r) => ({
          country: r.dimensionValues?.[0]?.value ?? "",
          activeUsers: Number(r.metricValues?.[0]?.value ?? 0),
        }));

        return NextResponse.json({ rows });
      }

      case "platforms": {
        const [response] = await client.runReport({
          property,
          dateRanges: [
            { startDate: `${days}daysAgo`, endDate: "today" },
          ],
          dimensions: [{ name: "platform" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [
            { metric: { metricName: "activeUsers" }, desc: true },
          ],
        });

        const rows = (response.rows ?? []).map((r) => ({
          platform: r.dimensionValues?.[0]?.value ?? "",
          activeUsers: Number(r.metricValues?.[0]?.value ?? 0),
        }));

        return NextResponse.json({ rows });
      }

      default:
        return NextResponse.json(
          { error: "Invalid report type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Analytics error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: message || "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
