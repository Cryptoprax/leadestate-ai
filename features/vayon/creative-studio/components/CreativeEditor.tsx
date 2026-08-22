"use client";
import { useMemo, useState } from "react";
import { Button } from "@/features/platform/design-system";
import { autosaveCreativeEditorAction } from "../actions";
import type { EditableCreativeDocument } from "../domain";
const emptyElements: EditableCreativeDocument["elements"] = Object.freeze([]);
export function CreativeEditor({
  document,
  imageUrl,
}: {
  document: EditableCreativeDocument;
  imageUrl?: string;
}) {
  const [history, setHistory] = useState([document.elements]),
    [index, setIndex] = useState(0),
    [selected, setSelected] = useState(document.elements[0]?.id ?? ""),
    elements = history[index] ?? emptyElements,
    active = elements.find((x) => x.id === selected),
    commit = (next: EditableCreativeDocument["elements"]) => {
      const base = history.slice(0, index + 1);
      setHistory([...base, next]);
      setIndex(base.length);
    },
    change = (patch: Partial<EditableCreativeDocument["elements"][number]>) =>
      active &&
      commit(
        elements.map((x) => (x.id === active.id ? { ...x, ...patch } : x)),
      ),
    serialized = useMemo(() => JSON.stringify(elements), [elements]);
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <section className="overflow-auto rounded-2xl border border-vds-border bg-vds-elevated p-4">
        <div
          className="relative mx-auto origin-top-left overflow-hidden bg-vds-surface shadow-xl"
          style={{
            width: Math.min(document.width, 760),
            aspectRatio: `${document.width}/${document.height}`,
            backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {elements
            .filter((x) => x.type !== "image")
            .map((element) => (
              <Button
                variant="control"
                type="button"
                onClick={() => setSelected(element.id)}
                key={element.id}
                className={`absolute overflow-hidden border text-left ${selected === element.id ? "border-vds-primary" : "border-transparent"}`}
                style={{
                  left: `${(element.x / document.width) * 100}%`,
                  top: `${(element.y / document.height) * 100}%`,
                  width: `${(element.width / document.width) * 100}%`,
                  height: `${(element.height / document.height) * 100}%`,
                  fontSize:
                    Number(element.style.fontSize ?? 32) *
                    Math.min(760 / document.width, 1),
                  fontWeight: Number(element.style.fontWeight ?? 400),
                }}
              >
                {element.content}
              </Button>
            ))}
        </div>
      </section>
      <aside className="space-y-4 rounded-2xl border border-vds-border bg-vds-surface p-5">
        <h2 className="font-semibold">Creative editor</h2>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={index === 0}
            onClick={() => setIndex((x) => x - 1)}
          >
            Undo
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={index === history.length - 1}
            onClick={() => setIndex((x) => x + 1)}
          >
            Redo
          </Button>
        </div>
        {active && (
          <div className="space-y-3">
            <label className="block text-xs text-vds-muted">
              Text
              <textarea
                value={active.content}
                onChange={(event) => change({ content: event.target.value })}
                className="mt-1 min-h-24 w-full rounded-xl border border-vds-border bg-vds-elevated p-3 text-sm"
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["Left", { x: Math.max(0, active.x - 10) }],
                [
                  "Right",
                  { x: Math.min(document.width - active.width, active.x + 10) },
                ],
                ["Up", { y: Math.max(0, active.y - 10) }],
                [
                  "Down",
                  {
                    y: Math.min(document.height - active.height, active.y + 10),
                  },
                ],
                [
                  "Wider",
                  {
                    width: Math.min(
                      document.width - active.x,
                      active.width + 20,
                    ),
                  },
                ],
                ["Narrower", { width: Math.max(40, active.width - 20) }],
                [
                  "Taller",
                  {
                    height: Math.min(
                      document.height - active.y,
                      active.height + 20,
                    ),
                  },
                ],
                ["Shorter", { height: Math.max(30, active.height - 20) }],
              ].map(([label, patch]) => (
                <Button
                  key={String(label)}
                  type="button"
                  variant="control"
                  onClick={() =>
                    change(
                      patch as Partial<
                        EditableCreativeDocument["elements"][number]
                      >,
                    )
                  }
                >
                  {String(label)}
                </Button>
              ))}
            </div>
            <label className="block text-xs text-vds-muted">
              Replace image reference
              <input
                className="mt-1 h-10 w-full rounded-xl border border-vds-border bg-vds-elevated px-3"
                placeholder="Approved asset reference"
              />
            </label>
            <label className="block text-xs text-vds-muted">
              Layout
              <select className="mt-1 h-10 w-full rounded-xl border border-vds-border bg-vds-elevated px-3">
                <option>Current layout</option>
                <option>Luxury</option>
                <option>Modern</option>
                <option>Minimal</option>
                <option>Corporate</option>
              </select>
            </label>
          </div>
        )}
        <form action={autosaveCreativeEditorAction}>
          <input type="hidden" name="assetId" value={document.assetId} />
          <input type="hidden" name="revision" value={document.revision} />
          <input type="hidden" name="elements" value={serialized} />
          <Button className="w-full" type="submit">
            Save Draft
          </Button>
        </form>
        <p className="text-xs text-vds-muted">
          Autosave-ready · Revision {document.revision} · exports and publishing
          require approval.
        </p>
      </aside>
    </div>
  );
}
