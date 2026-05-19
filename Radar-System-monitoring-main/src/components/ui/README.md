# `components/ui` Folder

This folder contains reusable UI primitives.

These components are generic building blocks used by the app pages.

Examples:

- `button.tsx`: button styles and variants.
- `card.tsx`: card containers used for dashboard blocks and forms.
- `table.tsx`: table structure used for radars, detections, violations, users, and vehicles.
- `badge.tsx`: small status labels.
- `input.tsx`: styled input fields.
- `label.tsx`: form labels.
- `dialog.tsx`: modal dialogs.
- `select.tsx`: dropdown selection UI.
- `tabs.tsx`: tabbed UI.
- `sonner.tsx`: toast notification setup.

## Purpose

This folder keeps the design consistent.

Instead of each page creating its own button, table, dialog, or input styles, pages import from `components/ui`.

Example:

```ts
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

## Rule For This Folder

These components should stay generic.

They should not contain radar-specific business logic.

Good examples:

- A reusable `Button`
- A reusable `Table`
- A reusable `Dialog`

Bad examples:

- A component that only knows about radar penalties
- A component that directly edits users
- A component that directly creates violations

Business-specific UI belongs in pages or shared feature components.
