# `lib` Folder

This folder contains shared frontend logic.

It is not for page UI. It is for app-wide data, types, helpers, and runtime utilities.

Current files:

```text
error-capture.ts
error-page.ts
store.tsx
types.ts
utils.ts
```

## `store.tsx`

This is the main frontend store.

It stores:

- Accounts
- Login session
- User role
- Current email
- Radars
- Detections
- Violations
- Vehicles

It also provides actions such as:

- `login`
- `register`
- `logout`
- `addRadar`
- `updateRadar`
- `deleteRadar`
- `toggleRadar`
- `addDetection`
- `addVehicle`
- `setUserRole`
- `deleteAccount`

The store saves data to browser `localStorage`, so demo data remains after refreshing the page.

## `types.ts`

This file defines TypeScript interfaces.

Main types:

- `Radar`
- `Detection`
- `Violation`
- `Vehicle`
- `Account`
- `Role`

These types describe the shape of frontend data.

## `utils.ts`

This file contains shared helper functions.

It is commonly used for class name merging and small utilities.

## `error-capture.ts`

This file supports error capture for server-side rendering/runtime failures.

It helps preserve useful error information so the app can show a cleaner failure page.

## `error-page.ts`

This file renders a custom error page for serious server-side rendering errors.

## Future Backend Connection

When the React app is connected more deeply to Spring Boot, this folder is a good place for an API client such as:

```text
api.ts
```

That file could centralize calls like:

- `GET /api/radars`
- `GET /api/telemetry/latest`
- `GET /api/alerts`

## Rule For This Folder

Keep shared logic here.

Do not put page layouts or route components in `lib`.
