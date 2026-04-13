"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bell,
  Send,
  Search,
  CheckCircle2,
  XCircle,
  Users,
  Megaphone,
  Clock,
  History,
} from "lucide-react";
import type {
  CognitoUser,
  NotificationType,
  NotificationPayload,
  NotificationTarget,
  NotificationLogRecord,
} from "@/lib/types";

const TOPICS = [
  { value: "new-stories", label: "New Stories" },
  { value: "site-updates", label: "Site Updates" },
];

const NOTIFICATION_TYPES: { value: NotificationType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "story", label: "Story" },
  { value: "site", label: "Site" },
  { value: "category", label: "Category" },
];

function formatDate(epoch: number) {
  return new Date(epoch * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TargetBadge({ log }: { log: NotificationLogRecord }) {
  if (log.targetMode === "topic") {
    return (
      <Badge variant="secondary" className="text-[10px]">
        Topic: {log.topic ?? "all"}
      </Badge>
    );
  }
  if (log.targetMode === "broadcast") {
    return (
      <Badge variant="secondary" className="text-[10px]">
        Broadcast
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-[10px]">
      {log.targetUserIds?.length ?? 0} user(s)
    </Badge>
  );
}

export default function NotificationsPage() {
  // Compose form state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notifType, setNotifType] = useState<NotificationType>("general");
  const [storyId, setStoryId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Target state
  const [mode, setMode] = useState<"broadcast" | "topic" | "users">("broadcast");
  const [topic, setTopic] = useState("new-stories");

  // User selection state
  const [users, setUsers] = useState<CognitoUser[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );
  const [userFilter, setUserFilter] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);

  // Send state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    success: number;
    failure: number;
  } | null>(null);
  const [sendError, setSendError] = useState("");

  // History state
  const [history, setHistory] = useState<NotificationLogRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyTotal, setHistoryTotal] = useState(0);

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch("/api/notifications/history?limit=50");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setHistory(data.notifications);
      setHistoryTotal(data.total);
    } catch {
      // ignore
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const fetchUsers = useCallback(
    async (pageToken?: string, filter?: string) => {
      const isNew = !pageToken;
      if (isNew) setLoadingUsers(true);
      else setLoadingMoreUsers(true);

      try {
        const params = new URLSearchParams();
        if (pageToken) params.set("token", pageToken);
        if (filter) params.set("filter", filter);
        const res = await fetch(`/api/users?${params.toString()}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (isNew) setUsers(data.users);
        else setUsers((prev) => [...prev, ...data.users]);
        setNextToken(data.nextToken);
      } catch {
        // ignore
      } finally {
        setLoadingUsers(false);
        setLoadingMoreUsers(false);
      }
    },
    []
  );

  useEffect(() => {
    if (mode === "users") {
      fetchUsers(undefined, userFilter || undefined);
    }
  }, [mode, userFilter, fetchUsers]);

  const handleUserSearch = () => {
    setUserFilter(userSearch);
  };

  const toggleUser = (userId: string) => {
    setSelectedUserIds((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  const buildPayload = (): NotificationPayload => ({
    title,
    body,
    ...(imageUrl ? { imageUrl } : {}),
    type: notifType,
    ...(notifType === "story" && storyId ? { storyId } : {}),
    ...(notifType === "site" && siteId ? { siteId } : {}),
    ...(notifType === "category" && categoryId ? { categoryId } : {}),
  });

  const buildTarget = (): NotificationTarget => {
    if (mode === "broadcast") {
      return { mode: "broadcast" };
    }
    if (mode === "topic") {
      return { mode: "topic", topic };
    }
    return { mode: "users", userIds: Array.from(selectedUserIds) };
  };

  const canSend =
    title.trim() &&
    body.trim() &&
    (mode === "broadcast" || mode === "topic" || selectedUserIds.size > 0);

  const handleSend = async () => {
    setConfirmOpen(false);
    setSending(true);
    setResult(null);
    setSendError("");

    try {
      const res = await fetch("/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: buildPayload(),
          target: buildTarget(),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }

      const data = await res.json();
      setResult({ success: data.successCount, failure: data.failureCount });
      // Refresh history after successful send
      fetchHistory();
    } catch (err) {
      setSendError(
        err instanceof Error ? err.message : "Failed to send notification"
      );
    } finally {
      setSending(false);
    }
  };

  const recipientLabel =
    mode === "broadcast"
      ? "All Users (Broadcast)"
      : mode === "topic"
        ? `Topic: ${TOPICS.find((t) => t.value === topic)?.label ?? topic}`
        : `${selectedUserIds.size} selected user(s)`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Compose Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Compose Notification
            </CardTitle>
            <CardDescription>
              Send push notifications to your app and web users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Notification title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder="Notification message..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (optional)</Label>
              <Input
                id="imageUrl"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select
                  value={notifType}
                  onValueChange={(v) =>
                    setNotifType(v as NotificationType)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NOTIFICATION_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {notifType === "story" && (
                <div className="space-y-2">
                  <Label htmlFor="storyId">Story ID</Label>
                  <Input
                    id="storyId"
                    placeholder="e.g. medusa-legend"
                    value={storyId}
                    onChange={(e) => setStoryId(e.target.value)}
                  />
                </div>
              )}
              {notifType === "site" && (
                <div className="space-y-2">
                  <Label htmlFor="siteId">Site ID</Label>
                  <Input
                    id="siteId"
                    placeholder="e.g. acropolis"
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                  />
                </div>
              )}
              {notifType === "category" && (
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category ID</Label>
                  <Input
                    id="categoryId"
                    placeholder="e.g. ancient_ruins"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Result / Error */}
            {result && (
              <div className="flex items-center gap-3 rounded-md border p-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Notification sent!</p>
                  <p className="text-xs text-muted-foreground">
                    Success: {result.success} | Failed: {result.failure}
                  </p>
                </div>
              </div>
            )}
            {sendError && (
              <div className="flex items-center gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3">
                <XCircle className="h-5 w-5 text-destructive" />
                <p className="text-sm text-destructive">{sendError}</p>
              </div>
            )}

            <Button
              className="w-full"
              onClick={() => setConfirmOpen(true)}
              disabled={!canSend || sending}
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Target Selection */}
        <div className="space-y-4">
          <Tabs
            value={mode}
            onValueChange={(v) => setMode(v as "broadcast" | "topic" | "users")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="broadcast" className="flex-1">
                <Megaphone className="mr-2 h-4 w-4" />
                Broadcast
              </TabsTrigger>
              <TabsTrigger value="topic" className="flex-1">
                <Bell className="mr-2 h-4 w-4" />
                Topic
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1">
                <Users className="mr-2 h-4 w-4" />
                Targeted
              </TabsTrigger>
            </TabsList>

            <TabsContent value="broadcast">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Broadcast to All</CardTitle>
                  <CardDescription>
                    Send to all registered devices
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="topic">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Select Topic</CardTitle>
                  <CardDescription>
                    Send to users subscribed to a topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    Select Users
                    {selectedUserIds.size > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedUserIds.size} selected
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Search */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search email..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleUserSearch();
                        }}
                        className="h-8 pl-8 text-sm"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleUserSearch}
                    >
                      Go
                    </Button>
                  </div>

                  {/* User list */}
                  <div className="max-h-[400px] overflow-auto">
                    {loadingUsers ? (
                      <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Skeleton key={i} className="h-10 w-full" />
                        ))}
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-8" />
                            <TableHead>User</TableHead>
                            <TableHead>Provider</TableHead>
                            <TableHead>Language</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="py-4 text-center text-sm text-muted-foreground"
                              >
                                No users found
                              </TableCell>
                            </TableRow>
                          ) : (
                            users.map((u) => (
                              <TableRow
                                key={u.userId}
                                className="cursor-pointer"
                                onClick={() => toggleUser(u.userId)}
                              >
                                <TableCell>
                                  <input
                                    type="checkbox"
                                    checked={selectedUserIds.has(u.userId)}
                                    onChange={() => toggleUser(u.userId)}
                                    className="h-4 w-4 rounded border"
                                  />
                                </TableCell>
                                <TableCell className="text-sm">
                                  <p className="font-medium">
                                    {u.email || u.name || "—"}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant="outline"
                                    className="text-[10px]"
                                  >
                                    {u.provider}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                  {u.locale ?? "—"}
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    )}
                  </div>

                  {nextToken && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() =>
                        fetchUsers(nextToken, userFilter || undefined)
                      }
                      disabled={loadingMoreUsers}
                    >
                      {loadingMoreUsers ? "Loading..." : "Load more"}
                    </Button>
                  )}

                  {selectedUserIds.size > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedUserIds(new Set())}
                    >
                      Clear selection
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Notification History
            {historyTotal > 0 && (
              <Badge variant="secondary" className="ml-2">
                {historyTotal}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Previously sent push notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingHistory ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No notifications sent yet
            </p>
          ) : (
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Body
                    </TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(log.sentAt)}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm font-medium">
                        {log.title}
                      </TableCell>
                      <TableCell className="hidden max-w-[250px] truncate text-xs text-muted-foreground md:table-cell">
                        {log.body}
                      </TableCell>
                      <TableCell>
                        <TargetBadge log={log} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {log.type ?? "general"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-xs">
                          <span className="text-green-600">
                            {log.successCount}
                          </span>
                          {log.failureCount > 0 && (
                            <>
                              {" / "}
                              <span className="text-red-500">
                                {log.failureCount}
                              </span>
                            </>
                          )}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send Notification?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-muted-foreground text-sm space-y-2">
                <p>
                  <strong>To:</strong> {recipientLabel}
                </p>
                <p>
                  <strong>Title:</strong> {title}
                </p>
                <p>
                  <strong>Body:</strong> {body}
                </p>
                {imageUrl && (
                  <p>
                    <strong>Image:</strong> {imageUrl}
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend}>
              Send Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
