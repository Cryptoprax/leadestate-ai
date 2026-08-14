"use client";

import { Button, ButtonLink } from "@/features/platform/design-system";
import { DashboardShell } from "@/features/vayon/dashboard/components/DashboardShell";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState, type MouseEvent } from "react";
import type {
  DemoCollection,
  DemoExperienceModel,
  DemoRecord,
} from "../domain/contracts";

const tabs = [
  "dashboard",
  "properties",
  "leads",
  "deals",
  "communications",
  "activity",
] as const;
type Tab = (typeof tabs)[number];
const pageSize = 24;

export function DemoExperience({
  model,
}: {
  readonly model: DemoExperienceModel;
}) {
  const [tab, setTab] = useState<Tab>("dashboard"),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(0),
    [notice, setNotice] = useState(false);
  const filtered = useMemo(() => {
    const records =
      tab === "dashboard" ? [] : model.inventory[tab as DemoCollection];
    const term = query.trim().toLocaleLowerCase();
    return term
      ? records.filter((item) =>
          [item.title, item.subtitle, item.status, ...item.meta].some((value) =>
            value.toLocaleLowerCase().includes(term),
          ),
        )
      : records;
  }, [model.inventory, query, tab]);
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize),
    pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  function select(next: Tab) {
    setTab(next);
    setQuery("");
    setPage(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function protect(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (anchor?.getAttribute("href")?.startsWith("/vayon")) {
      event.preventDefault();
      setNotice(true);
    }
  }
  return (
    <div
      onClickCapture={protect}
      className="min-h-dvh bg-vds-background text-vds-foreground"
    >
      <header className="sticky top-0 z-50 border-b border-vds-border bg-vds-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[106rem] items-center gap-3 px-4 sm:px-6">
          <span className="grid size-9 place-items-center rounded-xl bg-vds-primary text-sm font-bold text-vds-background">
            V
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Vayon OS</p>
            <p className="truncate text-[10px] text-vds-subtle">
              Aurora Realty Group
            </p>
          </div>
          <span className="ml-auto hidden items-center gap-2 rounded-full border border-vds-warning/20 bg-vds-warning-soft px-3 py-1.5 text-xs text-vds-warning sm:inline-flex">
            <LockKeyhole className="size-4" />
            Read-only demo
          </span>
          <ButtonLink href="/signup" className="shrink-0">
            Start free
          </ButtonLink>
        </div>
      </header>
      <section className="border-b border-vds-border bg-vds-warning-soft">
        <div className="mx-auto flex max-w-[106rem] flex-col gap-2 px-4 py-3 text-xs sm:flex-row sm:items-center sm:px-6">
          <strong className="flex items-center gap-2 text-vds-warning">
            <Building2 className="size-4" />
            Demo Environment
          </strong>
          <span className="text-vds-muted">
            Using Aurora Realty Group · Changes are not persisted.
          </span>
          <span className="sm:ml-auto text-vds-subtle">
            Seeded, isolated fixtures
          </span>
        </div>
      </section>
      <nav
        aria-label="Demo sections"
        className="sticky top-16 z-40 overflow-x-auto border-b border-vds-border bg-vds-background/90 px-4 backdrop-blur-xl sm:px-6"
      >
        <div className="mx-auto flex max-w-[100rem] gap-1 py-2">
          {tabs.map((item) => (
            <Button
              key={item}
              variant="control"
              type="button"
              onClick={() => select(item)}
              aria-current={tab === item ? "page" : undefined}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs capitalize ${tab === item ? "bg-vds-primary-soft text-vds-primary" : "text-vds-muted hover:bg-vds-hover hover:text-vds-foreground"}`}
            >
              {item}
            </Button>
          ))}
        </div>
      </nav>
      {tab === "dashboard" ? (
        <DashboardShell
          data={model.dashboard}
          onBlockedAction={() => setNotice(true)}
        />
      ) : (
        <DemoBrowser
          tab={tab}
          query={query}
          onQuery={(value) => {
            setQuery(value);
            setPage(0);
          }}
          records={visible}
          total={filtered.length}
          page={page}
          pages={pages}
          onPage={setPage}
        />
      )}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[80] flex max-w-sm items-start gap-3 rounded-2xl border border-vds-warning/25 bg-vds-surface p-4 shadow-xl shadow-vds-shadow"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-vds-warning" />
          <div>
            <p className="text-sm font-medium">
              Demo Mode — Changes are not saved.
            </p>
            <p className="mt-1 text-xs text-vds-muted">
              Create and edit actions are disabled in this isolated environment.
            </p>
          </div>
          <Button
            variant="control"
            type="button"
            aria-label="Dismiss message"
            onClick={() => setNotice(false)}
            className="p-1 text-vds-muted"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function DemoBrowser({
  tab,
  query,
  onQuery,
  records,
  total,
  page,
  pages,
  onPage,
}: {
  readonly tab: Exclude<Tab, "dashboard">;
  readonly query: string;
  readonly onQuery: (value: string) => void;
  readonly records: readonly DemoRecord[];
  readonly total: number;
  readonly page: number;
  readonly pages: number;
  readonly onPage: (page: number) => void;
}) {
  return (
    <main className="mx-auto max-w-[100rem] px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-vds-primary">
            Aurora workspace
          </p>
          <h1 className="mt-2 text-3xl font-semibold capitalize tracking-tight">
            {tab}
          </h1>
          <p className="mt-2 text-sm text-vds-muted">
            {total.toLocaleString("en-IN")} deterministic demo records · Read
            only
          </p>
        </div>
        <label className="flex h-11 w-full items-center gap-2 rounded-xl border border-vds-border bg-vds-input px-3 focus-within:border-vds-accent-border md:max-w-sm">
          <Search className="size-4 text-vds-subtle" />
          <span className="sr-only">Search {tab}</span>
          <input
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={`Search ${tab}...`}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-vds-subtle"
          />
        </label>
      </header>
      <div
        className={`mt-6 grid gap-3 ${tab === "properties" ? "sm:grid-cols-2 xl:grid-cols-3" : ""}`}
      >
        {records.map((record) => (
          <DemoRecordCard key={record.id} record={record} />
        ))}
      </div>
      {!records.length && (
        <div className="mt-6 rounded-3xl border border-dashed border-vds-border p-14 text-center">
          <Search className="mx-auto size-6 text-vds-subtle" />
          <p className="mt-3 text-sm">No matching demo records.</p>
        </div>
      )}
      <footer className="mt-6 flex items-center justify-between border-t border-vds-divider pt-5">
        <p className="text-xs text-vds-subtle">
          Page {page + 1} of {pages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="button"
            disabled={page === 0}
            onClick={() => onPage(page - 1)}
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          <Button
            variant="secondary"
            type="button"
            disabled={page >= pages - 1}
            onClick={() => onPage(page + 1)}
          >
            Next
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </footer>
    </main>
  );
}

function DemoRecordCard({ record }: { readonly record: DemoRecord }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-vds-border bg-vds-surface ${record.kind === "properties" ? "" : "p-4"}`}
    >
      {record.image && (
        <Image
          src={record.image}
          alt=""
          width={640}
          height={360}
          className="aspect-[16/8] w-full object-cover"
        />
      )}
      <div className={record.image ? "p-4" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-vds-secondary">
              {record.title}
            </h2>
            <p className="mt-1 truncate text-xs text-vds-muted">
              {record.subtitle}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-vds-primary-soft px-2 py-1 text-[10px] capitalize text-vds-primary">
            {record.status.replaceAll("-", " ")}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {record.meta.slice(0, 4).map((item, index) => (
            <span
              key={`${record.id}-${index}`}
              className="rounded-lg bg-vds-elevated px-2 py-1 text-[10px] capitalize text-vds-subtle"
            >
              {item}
            </span>
          ))}
        </div>
        {record.occurredAt && (
          <time className="mt-3 block text-[10px] text-vds-subtle">
            {new Date(record.occurredAt).toLocaleString("en-IN")}
          </time>
        )}
      </div>
    </article>
  );
}
