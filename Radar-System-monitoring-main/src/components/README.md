# `components` Folder

This folder contains shared React components.

Components here are reused by multiple pages.

Current files:

```text
AppLayout.tsx
PageHeader.tsx
ui/
```

## `AppLayout.tsx`

This is the main layout shown after login.

It handles:

- Sidebar navigation
- Admin/user menu differences
- Displaying the logged-in role and email
- Logout button
- Redirecting unauthenticated users to `/login`
- Rendering the active page with `<Outlet />`

Admins see links such as:

- Dashboard
- Radars
- Detections
- Infractions
- Vehicules
- Utilisateurs

Normal users see:

- Dashboard
- Mon vehicule

## `PageHeader.tsx`

This is a reusable header used at the top of pages.

It displays:

- Page title
- Page description
- Optional action buttons

Using `PageHeader` keeps page headers consistent.

## `ui`

The `ui` folder contains low-level reusable UI components such as buttons, cards, tables, dialogs, and inputs.

Business pages should use these instead of restyling everything from scratch.

## When To Add Files Here

Add a component here when:

- It is reused by more than one route.
- It is part of the app shell/layout.
- It is a shared visual pattern.

If a component is only used by one page, it can stay inside that page file until it becomes reusable.
