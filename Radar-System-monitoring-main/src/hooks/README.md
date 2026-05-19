# `hooks` Folder

This folder contains reusable React hooks.

Hooks are functions that share React behavior between components.

Current file:

```text
use-mobile.tsx
```

## `use-mobile.tsx`

This hook detects whether the current screen size is mobile.

It can be used by components that need to change behavior or layout depending on screen width.

Example use cases:

- Collapsing navigation on small screens
- Changing layout between desktop and mobile
- Adjusting dialogs or panels for mobile screens

## When To Add Hooks Here

Add a hook here when:

- It is reusable.
- It contains React behavior, not just a simple helper.
- More than one component may need it.

Examples of future hooks:

- `useAuthRedirect`
- `useRadarStats`
- `useLocalStorage`
- `useApi`
