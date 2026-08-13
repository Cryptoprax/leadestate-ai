import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("VDS tokens cover every required design dimension", () => {
  const source = read("features/platform/design-system/tokens/tokens.ts");
  for (const token of ["colors", "typography", "spacing", "sizing", "radius", "elevation", "shadows", "opacity", "borders", "motion", "durations", "easing", "breakpoints", "zIndex"]) assert.match(source, new RegExp(`${token}:`));
  const css = read("features/platform/design-system/tokens/vds.css");
  assert.match(css, /--vds-color-background/);
  assert.match(read("app/globals.css"), /design-system\/tokens\/vds\.css/);
});

test("theme engine supports dark light system and future custom themes", () => {
  const contracts = read("features/platform/design-system/theme/contracts.ts"), provider = read("features/platform/design-system/theme/ThemeProvider.tsx");
  for (const theme of ["dark", "light", "system", "custom"]) assert.match(contracts, new RegExp(`\"${theme}\"`));
  assert.match(provider, /useSyncExternalStore/);
  assert.match(provider, /prefers-color-scheme: dark/);
  assert.match(provider, /custom\?\.variables/);
  assert.match(read("app/layout.tsx"), /VdsThemeProvider/);
});

test("core component barrel exports the complete required catalog", () => {
  const files = ["components/core/Actions.tsx", "components/core/Surfaces.tsx", "components/forms/Fields.tsx", "components/disclosure/Disclosure.tsx", "components/feedback/Feedback.tsx", "components/metrics/Metrics.tsx"].map(file => read(`features/platform/design-system/${file}`)).join("\n");
  for (const component of ["Button", "IconButton", "Card", "Panel", "Section", "Divider", "Input", "Textarea", "Select", "MultiSelect", "SearchInput", "Checkbox", "Radio", "Switch", "Tabs", "Accordion", "Dialog", "Drawer", "Popover", "Tooltip", "Toast", "Badge", "Avatar", "Chip", "Tag", "Progress", "Skeleton", "EmptyState", "ErrorState", "LoadingState", "KpiCard", "MetricCard", "StatusCard", "TimelineCard"]) assert.match(files, new RegExp(`(?:function|const) ${component}`));
  assert.match(read("features/platform/design-system/index.ts"), /components\/core\/Actions/);
});

test("data components are generic provider-neutral UI primitives", () => {
  const source = read("features/platform/design-system/components/data/Data.tsx");
  for (const component of ["DataTable", "VirtualTable", "StatCards", "ChartPlaceholder", "Filters", "Pagination", "SearchToolbar"]) assert.match(source, new RegExp(`function ${component}`));
  assert.doesNotMatch(source, /createClient|supabase|fetch\(|axios|\.rpc\(|\.from\(/i);
});

test("layout contracts cover every required responsive composition", () => {
  const source = read("features/platform/design-system/layout/Layouts.tsx");
  for (const component of ["Page", "Dashboard", "Workspace", "Sidebar", "Topbar", "SplitView", "InspectorPanel"]) assert.match(source, new RegExp(`function ${component}`));
  for (const breakpoint of ["sm:", "lg:", "xl:"]) assert.match(source, new RegExp(breakpoint));
});

test("motion and accessibility cover focus keyboard contrast and reduced motion", () => {
  const motion = read("features/platform/design-system/motion/motion.ts"), css = read("features/platform/design-system/tokens/vds.css"), disclosure = read("features/platform/design-system/components/disclosure/Disclosure.tsx"), hooks = read("features/platform/design-system/accessibility/hooks.ts");
  for (const name of ["overlay", "drawer", "modal", "tooltip", "dropdown", "card", "hover", "loading", "success"]) assert.match(motion, new RegExp(`${name}:`));
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /focus-visible/);
  assert.match(disclosure, /aria-modal="true"/);
  assert.match(disclosure, /ArrowRight/);
  assert.match(disclosure, /Escape/);
  assert.match(hooks, /useFocusTrap/);
});

test("icon registry and Storybook catalog are extensible without Storybook installation", () => {
  assert.match(read("features/platform/design-system/icons/registry.ts"), /registerVdsIcons/);
  const catalog = read("features/platform/design-system/storybook/catalog.ts");
  assert.match(catalog, /storyReady: true/);
  assert.match(catalog, /vdsStorybookCatalog/);
  assert.doesNotMatch(read("package.json"), /@storybook/);
});

test("VDS contains no business logic APIs AI or database writes", () => {
  const files = ["tokens/tokens.ts", "theme/ThemeProvider.tsx", "components/core/Actions.tsx", "components/forms/Fields.tsx", "components/disclosure/Disclosure.tsx", "components/data/Data.tsx", "layout/Layouts.tsx"].map(file => read(`features/platform/design-system/${file}`)).join("\n");
  assert.doesNotMatch(files, /createClient|supabase|fetch\(|axios|\.from\(|\.rpc\(|insert\(|update\(|delete\(|upsert\(|openai|anthropic|gemini|LeadService|DealService|PropertyService/i);
  assert.match(read("docs/RELEASE_1_7_DESIGN_SYSTEM.md"), /Release 1\.7/);
});
