# `routes` Folder

This folder contains the app pages.

The project uses TanStack Router file-based routing.

That means each route file maps to a URL.

## Route Files

```text
__root.tsx
index.tsx
login.tsx
radars.tsx
detections.tsx
violations.tsx
vehicules.tsx
utilisateurs.tsx
mon-vehicule.tsx
```

## `__root.tsx`

This is the root route.

It sets up:

- HTML shell
- Page metadata
- Global stylesheet link
- Query client provider
- Store provider
- App layout
- Toast notifications
- Not found page
- Error page

All routes live under this root.

## `index.tsx`

This is the dashboard route:

```text
/
```

Admins see the global dashboard with radar totals, detections, infractions, dangerous zones, and fine totals.

Normal users see their personal dashboard filtered by their registered car matricule. It shows their radars, detected passages, infractions, and total penalty cost.

## `login.tsx`

This route handles login and registration:

```text
/login
```

It lets users:

- Log in
- Register a new standard user account

After login, users are redirected to the dashboard.

## `radars.tsx`

Admin page for managing radars:

```text
/radars
```

It handles radar list, creation, editing, activation, and deletion.

## `detections.tsx`

Admin page for radar detections:

```text
/detections
```

It shows vehicle passages detected by radars.

Admins can add a detection. If the speed is over the radar limit, the frontend automatically creates a violation.

## `violations.tsx`

Admin page for infractions:

```text
/violations
```

It shows speeding violations, fine amounts, severity, radar location, and date.

## `vehicules.tsx`

Admin page for all registered vehicles:

```text
/vehicules
```

It shows vehicles registered by users.

## `utilisateurs.tsx`

Admin page for user management:

```text
/utilisateurs
```

It lets admins:

- View accounts
- Promote users to admin
- Demote admins to user
- Delete accounts

## `mon-vehicule.tsx`

User page for vehicle registration:

```text
/mon-vehicule
```

Normal users can add their car matricule and fiscal horsepower.

The user dashboard uses this matricule to filter detections, radars, penalties, and cost.

## Route Tree

TanStack Router generates:

```text
src/routeTree.gen.ts
```

Do not edit that generated file manually. It is overwritten by the router tooling.
