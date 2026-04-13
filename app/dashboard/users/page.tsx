"use client";

import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Search, ChevronDown, Smartphone } from "lucide-react";
import type { CognitoUser, DeviceTokenRecord } from "@/lib/types";

const providerColors: Record<string, "default" | "secondary" | "outline"> = {
  Google: "default",
  Apple: "secondary",
  Phone: "outline",
  Email: "outline",
};

export default function UsersPage() {
  const [users, setUsers] = useState<CognitoUser[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [deviceTokens, setDeviceTokens] = useState<
    Record<string, DeviceTokenRecord[]>
  >({});

  const fetchUsers = useCallback(
    async (pageToken?: string, searchFilter?: string) => {
      const isNewSearch = !pageToken;
      if (isNewSearch) setLoading(true);
      else setLoadingMore(true);

      try {
        const params = new URLSearchParams();
        if (pageToken) params.set("token", pageToken);
        if (searchFilter) params.set("filter", searchFilter);

        const res = await fetch(`/api/users?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();

        if (isNewSearch) {
          setUsers(data.users);
        } else {
          setUsers((prev) => [...prev, ...data.users]);
        }
        setNextToken(data.nextToken);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers(undefined, filter || undefined);
  }, [filter, fetchUsers]);

  const handleSearch = () => {
    setFilter(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleExpand = async (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      return;
    }
    setExpandedUser(userId);

    if (!deviceTokens[userId]) {
      try {
        const res = await fetch(`/api/device-tokens?userId=${userId}`);
        if (res.ok) {
          const tokens = await res.json();
          setDeviceTokens((prev) => ({ ...prev, [userId]: tokens }));
        }
      } catch {
        // silently fail
      }
    }
  };

  if (error && users.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Users</h1>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Badge variant="secondary">
          <Users className="mr-1 h-3 w-3" />
          {users.length} loaded
        </Badge>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} variant="secondary">
          Search
        </Button>
        {filter && (
          <Button
            onClick={() => {
              setSearchInput("");
              setFilter("");
            }}
            variant="outline"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-2 p-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <Fragment key={user.userId}>
                      <TableRow
                        className="cursor-pointer"
                        onClick={() => toggleExpand(user.userId)}
                      >
                        <TableCell className="font-medium">
                          {user.email || "—"}
                        </TableCell>
                        <TableCell>{user.name || "—"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              providerColors[user.provider ?? "Email"] ??
                              "outline"
                            }
                          >
                            {user.provider}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.locale ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "CONFIRMED"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {user.status ?? "Unknown"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "—"}
                        </TableCell>
                        <TableCell>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedUser === user.userId
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </TableCell>
                      </TableRow>
                      {expandedUser === user.userId && (
                        <TableRow key={`${user.userId}-detail`}>
                          <TableCell colSpan={7} className="bg-muted/50">
                            <div className="space-y-2 py-2">
                              <p className="text-xs text-muted-foreground">
                                User ID: {user.userId}
                              </p>
                              {user.phoneNumber && (
                                <p className="text-xs text-muted-foreground">
                                  Phone: {user.phoneNumber}
                                </p>
                              )}
                              <div>
                                <p className="mb-1 text-xs font-medium">
                                  Device Tokens:
                                </p>
                                {deviceTokens[user.userId]?.length ? (
                                  <div className="space-y-1">
                                    {deviceTokens[user.userId].map((dt) => (
                                      <div
                                        key={dt.token}
                                        className="flex items-center gap-2 text-xs"
                                      >
                                        <Smartphone className="h-3 w-3" />
                                        <Badge
                                          variant="outline"
                                          className="text-[10px]"
                                        >
                                          {dt.platform}
                                        </Badge>
                                        <span className="max-w-[300px] truncate font-mono text-muted-foreground">
                                          {dt.token}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-xs text-muted-foreground">
                                    No device tokens registered
                                  </p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Load More */}
      {nextToken && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => fetchUsers(nextToken, filter || undefined)}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
