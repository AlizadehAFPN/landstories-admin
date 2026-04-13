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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CustomEventsTab from "@/components/analytics/CustomEventsTab";
import {
  Users,
  UserPlus,
  Activity,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import type {
  AnalyticsTimeSeries,
  AnalyticsTopContent,
  AnalyticsUsersByCountry,
  AnalyticsUsersByPlatform,
} from "@/lib/types";

interface OverviewData {
  activeUsers7d: number;
  newUsers7d: number;
  sessions7d: number;
  screenPageViews7d: number;
  avgSessionDuration7d: number;
  totalUsers: number;
  activeUsers30d: number;
  newUsers30d: number;
  sessions30d: number;
  screenPageViews30d: number;
  avgSessionDuration30d: number;
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

function StatSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16" />
        <Skeleton className="mt-1 h-3 w-32" />
      </CardContent>
    </Card>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDate(dateStr: string): string {
  // GA4 returns dates as YYYYMMDD
  if (dateStr.length === 8) {
    return `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`;
  }
  return dateStr;
}

const platformIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("ios") || lower.includes("iphone")) return Smartphone;
  if (lower.includes("android")) return Smartphone;
  if (lower.includes("tablet") || lower.includes("ipad")) return Tablet;
  return Monitor;
};

export default function AnalyticsPage() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [timeseries, setTimeseries] = useState<AnalyticsTimeSeries[]>([]);
  const [topContent, setTopContent] = useState<AnalyticsTopContent[]>([]);
  const [countries, setCountries] = useState<AnalyticsUsersByCountry[]>([]);
  const [platforms, setPlatforms] = useState<AnalyticsUsersByPlatform[]>([]);
  const [days, setDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (period: string) => {
    setLoading(true);
    setError("");
    try {
      const [ovRes, tsRes, tcRes, coRes, plRes] = await Promise.all([
        fetch("/api/analytics?report=overview"),
        fetch(`/api/analytics?report=timeseries&days=${period}`),
        fetch(`/api/analytics?report=top-content&days=${period}`),
        fetch(`/api/analytics?report=countries&days=${period}`),
        fetch(`/api/analytics?report=platforms&days=${period}`),
      ]);

      if (!ovRes.ok) {
        const err = await ovRes.json();
        throw new Error(err.error || "Failed to fetch analytics");
      }

      const [ovData, tsData, tcData, coData, plData] = await Promise.all([
        ovRes.json(),
        tsRes.json(),
        tcRes.json(),
        coRes.json(),
        plRes.json(),
      ]);

      setOverview(ovData);
      setTimeseries(tsData.rows ?? []);
      setTopContent(tcData.rows ?? []);
      setCountries(coData.rows ?? []);
      setPlatforms(plData.rows ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load analytics"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(days);
  }, [days, fetchData]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Custom Events</TabsTrigger>
          <TabsTrigger value="ga4">GA4 Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <CustomEventsTab />
        </TabsContent>

        <TabsContent value="ga4" className="mt-4">
          {error ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Make sure you have configured GA4_PROPERTY_ID in .env.local
                  and placed the Firebase service account key file.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
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

      {/* Overview KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
        ) : overview ? (
          <>
            <StatCard
              title="Active Users (7d)"
              value={overview.activeUsers7d.toLocaleString()}
              icon={Users}
              description={`${overview.activeUsers30d.toLocaleString()} in 30d`}
            />
            <StatCard
              title="New Users (7d)"
              value={overview.newUsers7d.toLocaleString()}
              icon={UserPlus}
              description={`${overview.newUsers30d.toLocaleString()} in 30d`}
            />
            <StatCard
              title="Total Users"
              value={overview.totalUsers.toLocaleString()}
              icon={Users}
            />
            <StatCard
              title="Sessions (7d)"
              value={overview.sessions7d.toLocaleString()}
              icon={Activity}
              description={`${overview.sessions30d.toLocaleString()} in 30d`}
            />
            <StatCard
              title="Page Views (7d)"
              value={overview.screenPageViews7d.toLocaleString()}
              icon={Eye}
              description={`${overview.screenPageViews30d.toLocaleString()} in 30d`}
            />
            <StatCard
              title="Avg Session"
              value={formatDuration(overview.avgSessionDuration7d)}
              icon={Clock}
              description={`${formatDuration(overview.avgSessionDuration30d)} in 30d`}
            />
          </>
        ) : null}
      </div>

      {/* Time Series Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Active Users & Sessions</CardTitle>
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
                <Tooltip
                  labelFormatter={(label) => {
                    const s = String(label);
                    if (s.length === 8) {
                      return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
                    }
                    return s;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="activeUsers"
                  name="Active Users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  name="Sessions"
                  stroke="hsl(var(--chart-2, 220 70% 50%))"
                  fill="hsl(var(--chart-2, 220 70% 50%))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No data available for this period
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Content</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : topContent.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topContent.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="max-w-[200px] truncate font-medium">
                        {row.pageTitle || "(not set)"}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.screenPageViews.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {row.activeUsers.toLocaleString()}
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

        {/* Users by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Users by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : countries.length > 0 ? (
              <div className="max-h-[300px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead className="text-right">Users</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countries.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          {row.country || "(not set)"}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.activeUsers.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="py-4 text-center text-muted-foreground">
                No data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Users by Platform</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-40" />
              ))}
            </div>
          ) : platforms.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {platforms.map((p) => {
                const PIcon = platformIcon(p.platform);
                return (
                  <Card key={p.platform}>
                    <CardContent className="flex items-center gap-3 pt-6">
                      <PIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-bold">
                          {p.activeUsers.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.platform}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">
              No data available
            </p>
          )}
        </CardContent>
      </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
