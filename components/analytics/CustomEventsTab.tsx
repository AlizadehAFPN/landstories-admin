"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, MapPin, Headphones } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  EventSummary,
  EventTimeSeriesRow,
  TopEventContentRow,
  RecentEventRow,
} from "@/lib/types";

function formatDate(dateStr: string): string {
  // YYYY-MM-DD → MM/DD
  const parts = dateStr.split("-");
  if (parts.length === 3) return `${parts[1]}/${parts[2]}`;
  return dateStr;
}

function timeAgo(epoch: number): string {
  const diff = Math.floor(Date.now() / 1000) - epoch;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const EVENT_BADGE_STYLES: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  story_click: { label: "Story", variant: "default" },
  site_click: { label: "Site", variant: "secondary" },
  audio_play: { label: "Audio", variant: "outline" },
};

export default function CustomEventsTab() {
  const [days, setDays] = useState("30");
  const [summary, setSummary] = useState<EventSummary | null>(null);
  const [timeseries, setTimeseries] = useState<EventTimeSeriesRow[]>([]);
  const [topStories, setTopStories] = useState<TopEventContentRow[]>([]);
  const [topSites, setTopSites] = useState<TopEventContentRow[]>([]);
  const [recent, setRecent] = useState<RecentEventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (period: string) => {
    setLoading(true);
    setError("");
    try {
      const base = "/api/analytics/events";
      const [sumRes, tsRes, storiesRes, sitesRes, recentRes] =
        await Promise.all([
          fetch(`${base}?report=summary&days=${period}`),
          fetch(`${base}?report=timeseries&days=${period}`),
          fetch(`${base}?report=top-stories&days=${period}`),
          fetch(`${base}?report=top-sites&days=${period}`),
          fetch(`${base}?report=recent`),
        ]);

      if (!sumRes.ok) {
        const err = await sumRes.json();
        throw new Error(err.error || "Failed to fetch events");
      }

      const [sumData, tsData, storiesData, sitesData, recentData] =
        await Promise.all([
          sumRes.json(),
          tsRes.json(),
          storiesRes.json(),
          sitesRes.json(),
          recentRes.json(),
        ]);

      setSummary(sumData);
      setTimeseries(tsData.rows ?? []);
      setTopStories(storiesData.rows ?? []);
      setTopSites(sitesData.rows ?? []);
      setRecent(recentData.rows ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load event data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(days);
  }, [days, fetchData]);

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-destructive">{error}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Make sure the AnalyticsEvent DynamoDB table has been created.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex justify-end">
        <Select value={days} onValueChange={setDays}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="14">Last 14 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        ) : summary ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Story Clicks
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.storyClicks.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Site Clicks
                </CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.siteClicks.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Audio Plays
                </CardTitle>
                <Headphones className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {summary.audioPlays.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Event Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : timeseries.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timeseries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip labelFormatter={(label) => String(label)} />
                <Area
                  type="monotone"
                  dataKey="storyClicks"
                  name="Story Clicks"
                  stroke="hsl(220 70% 50%)"
                  fill="hsl(220 70% 50%)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="siteClicks"
                  name="Site Clicks"
                  stroke="hsl(142 70% 45%)"
                  fill="hsl(142 70% 45%)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="audioPlays"
                  name="Audio Plays"
                  stroke="hsl(32 95% 50%)"
                  fill="hsl(32 95% 50%)"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No events recorded in this period
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top Stories & Top Sites */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Top Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : topStories.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Story</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topStories.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate font-medium">
                        {row.title}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.clicks.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="py-4 text-center text-muted-foreground">
                No data available
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Top Sites
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : topSites.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Site</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topSites.map((row, i) => (
                    <TableRow key={row.id}>
                      <TableCell className="text-muted-foreground">
                        {i + 1}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate font-medium">
                        {row.title}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.clicks.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="py-4 text-center text-muted-foreground">
                No data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : recent.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((row, i) => {
                  const badge = EVENT_BADGE_STYLES[row.eventType] ?? {
                    label: row.eventType,
                    variant: "outline" as const,
                  };
                  const title =
                    row.storyTitle ?? row.siteTitle ?? row.eventType;
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </TableCell>
                      <TableCell className="max-w-[250px] truncate font-medium">
                        {title}
                        {row.audioProvider && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({row.audioProvider})
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.lang ? (
                          <Badge variant="outline" className="text-[10px]">
                            {row.lang.toUpperCase()}
                          </Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {timeAgo(row.timestamp)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-4 text-center text-muted-foreground">
              No recent events
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
