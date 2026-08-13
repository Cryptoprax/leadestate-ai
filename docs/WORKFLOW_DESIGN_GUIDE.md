# Workflow Design Guide

## Start from a template

Open `/vayon/workflows` and select a library template. Templates create local planning documents only. Add nodes from the palette, drag them on the canvas, and use Shift-click for multi-selection.

## Canvas controls

- Use Zoom in/out or Ctrl/Command plus the mouse wheel.
- Scroll to pan and use Center to reset the viewport.
- Toggle the grid and drag nodes for 20-pixel snap positioning.
- Shift-click exactly two nodes and choose Connect to create a directional edge.
- Group selected nodes to preserve a visual responsibility boundary.
- Use Ctrl/Command+Z to undo, Ctrl/Command+Shift+Z or Ctrl/Command+Y to redo, and Escape to clear selection.

## Build a valid graph

Every workflow needs a Trigger. Connect all participating nodes, use declared variables, keep IDs unique, and avoid cycles. Loop is a design node only; bounded-loop runtime policy is intentionally deferred. Validation warnings can describe incomplete drafts, while errors prevent plan generation.

## Read the execution plan

The planner displays deterministic dependency order. It does not run nodes, call providers, update CRM objects, send messages, invoke AI, write Timeline events, or persist a published workflow. Timeline and business actions remain proposals for future approval-aware runtimes.

## Versioning

Treat a published version as immutable in future persistence. Editing should create the next draft version. Imports and plugins must validate against registered node, connection, trigger, action, and variable contracts before they can participate in planning.
