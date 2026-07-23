import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Loader2, LogOut, Search, Trash2 } from "lucide-react";

import {
  listServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
  checkIsAdmin,
} from "@/lib/adminRequests.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | AB Software" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Row = {
  id: string;
  full_name: string;
  company_name: string | null;
  email: string;
  phone: string;
  city: string | null;
  service_category: string;
  service_required: string;
  budget: string | null;
  preferred_delivery_date: string | null;
  project_description: string;
  preferred_contact_method: string;
  status: string;
  created_at: string;
};

const STATUSES = ["New", "In Progress", "Completed"] as const;

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const listFn = useServerFn(listServiceRequests);
  const updateFn = useServerFn(updateServiceRequestStatus);
  const deleteFn = useServerFn(deleteServiceRequest);
  const checkFn = useServerFn(checkIsAdmin);

  const isAdmin = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => checkFn(),
  });

  const rows = useQuery({
    queryKey: ["service-requests"],
    queryFn: () => listFn() as Promise<Row[]>,
    enabled: isAdmin.data?.isAdmin === true,
  });

  const updateStatus = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) =>
      updateFn({ data: v }),
    onSuccess: () => {
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["service-requests"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed"),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["service-requests"] });
      setToDelete(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [openRow, setOpenRow] = useState<Row | null>(null);
  const [toDelete, setToDelete] = useState<Row | null>(null);

  const data = rows.data ?? [];

  const categories = useMemo(
    () => Array.from(new Set(data.map((r) => r.service_category))).sort(),
    [data],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (categoryFilter !== "all" && r.service_category !== categoryFilter) return false;
      if (!q) return true;
      return [
        r.full_name,
        r.company_name,
        r.email,
        r.phone,
        r.city,
        r.service_required,
        r.project_description,
      ]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [data, search, statusFilter, categoryFilter]);

  async function onSignOut() {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/auth", replace: true });
  }

  function exportCsv() {
    const cols = [
      "id",
      "created_at",
      "status",
      "full_name",
      "company_name",
      "email",
      "phone",
      "city",
      "service_category",
      "service_required",
      "budget",
      "preferred_delivery_date",
      "preferred_contact_method",
      "project_description",
    ] as const;
    const esc = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      cols.join(","),
      ...filtered.map((r) => cols.map((c) => esc((r as any)[c])).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `service-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (isAdmin.isLoading) {
    return (
      <main className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (isAdmin.data && !isAdmin.data.isAdmin) {
    return (
      <main className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md text-center glass rounded-2xl p-8">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in, but does not have admin access. Ask an existing
            admin to grant you the admin role.
          </p>
          <Button className="mt-6" variant="outline" onClick={onSignOut}>
            Sign out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Service Requests</h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {data.length} requests
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="h-4 w-4 mr-1.5" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={onSignOut}>
              <LogOut className="h-4 w-4 mr-1.5" /> Sign out
            </Button>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search name, email, phone, description…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <Loader2 className="h-5 w-5 mx-auto animate-spin text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                      No requests match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow
                      key={r.id}
                      className="cursor-pointer"
                      onClick={() => setOpenRow(r)}
                    >
                      <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{r.full_name}</TableCell>
                      <TableCell className="text-sm">{r.email}</TableCell>
                      <TableCell className="text-sm">{r.service_category}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={r.status}
                          onValueChange={(v) =>
                            updateStatus.mutate({
                              id: r.id,
                              status: v as (typeof STATUSES)[number],
                            })
                          }
                        >
                          <SelectTrigger className="h-8 w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell
                        className="text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setToDelete(r)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Dialog open={!!openRow} onOpenChange={(o) => !o && setOpenRow(null)}>
        <DialogContent className="max-w-2xl">
          {openRow && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {openRow.full_name}
                  <Badge variant="secondary">{openRow.status}</Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <Info label="Request ID" value={openRow.id} />
                <Info
                  label="Submitted"
                  value={new Date(openRow.created_at).toLocaleString()}
                />
                <Info label="Company" value={openRow.company_name ?? "—"} />
                <Info label="City" value={openRow.city ?? "—"} />
                <Info label="Email" value={openRow.email} />
                <Info label="Phone" value={openRow.phone} />
                <Info label="Category" value={openRow.service_category} />
                <Info label="Service" value={openRow.service_required} />
                <Info label="Budget" value={openRow.budget ?? "—"} />
                <Info
                  label="Preferred date"
                  value={openRow.preferred_delivery_date ?? "—"}
                />
                <Info
                  label="Contact method"
                  value={openRow.preferred_contact_method}
                />
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Project description
                </div>
                <p className="text-sm whitespace-pre-wrap glass p-3 rounded-md">
                  {openRow.project_description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => toDelete && del.mutate(toDelete.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium break-words">{value}</div>
    </div>
  );
}