"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { MapPin, BookOpen, Globe, Tags, Flag, Star } from "lucide-react";
import type { DashboardStats } from "@/lib/types";

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

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setStats)
      .catch(() => setError("Failed to load stats. Check your AWS credentials."));
  }, []);

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats ? (
          <>
            <StatCard
              title="Total Sites"
              value={stats.totalSites}
              icon={MapPin}
              description="Heritage sites in database"
            />
            <StatCard
              title="Total Stories"
              value={stats.totalStories}
              icon={BookOpen}
              description="Across all sites"
            />
            <StatCard
              title="Languages"
              value={stats.languages}
              icon={Globe}
              description="Supported translations"
            />
            <StatCard
              title="Categories"
              value={stats.categories.explore + stats.categories.story}
              icon={Tags}
              description={`${stats.categories.explore} explore, ${stats.categories.story} story`}
            />
          </>
        ) : (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        )}
      </div>

      {stats && (
        <>
          <Separator />

          {/* Tier Breakdown */}
          <div>
            <h2 className="mb-3 text-lg font-semibold">Story Tiers</h2>
            <div className="flex flex-wrap gap-3">
              {(["S", "A", "B", "C"] as const).map((tier) => (
                <Card key={tier} className="min-w-[120px]">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-lg font-bold">
                        {stats.tiers[tier]}
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Tier {tier}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <h2 className="mb-3 text-lg font-semibold">Countries</h2>
            <div className="flex flex-wrap gap-2">
              {stats.countryIds.map((countryId) => (
                <Badge key={countryId} variant="outline" className="gap-1">
                  <Flag className="h-3 w-3" />
                  {countryId}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
