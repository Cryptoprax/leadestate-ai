"use client";
import { useState } from "react";
import Link from "next/link";
import type { ConversationRow } from "../domain/models";
export function InboxList({ items }: { items: readonly ConversationRow[] }) {
  const [selected, setSelected] = useState<string[]>([]),
    all = items.length > 0 && selected.length === items.length;
  return (
    <div>
      <div className="mb-3 flex items-center gap-3 text-xs text-vds-muted">
        <input
          aria-label="Select all conversations"
          type="checkbox"
          checked={all}
          onChange={() => setSelected(all ? [] : items.map((x) => x.id))}
        />
        <span>{selected.length} selected</span>
        <span>
          Bulk actions remain disabled until governed mutations are approved.
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-vds-border">
        {items.length ? (
          items.map((item) => (
            <article
              key={item.id}
              className="flex gap-3 border-b border-vds-border p-4 [contain-intrinsic-size:0_110px] [content-visibility:auto] hover:bg-vds-hover"
            >
              <input
                aria-label={`Select ${item.subject}`}
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() =>
                  setSelected((value) =>
                    value.includes(item.id)
                      ? value.filter((id) => id !== item.id)
                      : [...value, item.id],
                  )
                }
              />
              <Link
                href={`/vayon/communications/conversations/${item.id}`}
                className="min-w-0 flex-1"
              >
                <div className="flex items-center gap-2">
                  <h2 className="truncate font-medium">{item.customer}</h2>
                  {item.pinned && <span aria-label="Pinned">◆</span>}
                  <span className="ml-auto text-xs text-vds-muted">
                    {new Date(item.lastActivityAt).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm">{item.subject}</p>
                <p className="mt-2 text-xs capitalize text-vds-muted">
                  {item.channel} · {item.status} · {item.assignedHuman}
                  {item.unreadCount ? ` · ${item.unreadCount} unread` : ""}
                </p>
              </Link>
            </article>
          ))
        ) : (
          <p className="p-12 text-center text-sm text-vds-muted">
            No conversations match this view.
          </p>
        )}
      </div>
    </div>
  );
}
