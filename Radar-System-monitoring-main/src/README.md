# `src` Folder

This folder contains the frontend source code.

It is the main place where the React application is built.

Important files:

- `router.tsx`: creates the TanStack Router instance.
- `routeTree.gen.ts`: generated route tree from TanStack Router.
- `server.ts`: server entry wrapper used by TanStack Start.
- `start.ts`: TanStack Start setup.
- `styles.css`: global Tailwind/CSS styles.

Important folders:

- `components`: shared React components.
- `components/ui`: reusable UI primitives.
- `hooks`: reusable React hooks.
- `lib`: shared types, store, and utility logic.
- `routes`: app pages and URL routes.

## How It Works

The app starts by creating a router and rendering route components.

Routes are defined in `src/routes`. Shared UI comes from `src/components`. App state comes from `src/lib/store.tsx`.

This folder should contain source code only. Generated build output belongs in `dist`.
