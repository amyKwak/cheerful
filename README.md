# Cheerful 🌙

A tiny, cozy gratitude journal. Once a week you write down 5 things
you're grateful for; each night that follows, Cheerful hands them back
to you one at a time so you actually sit with them instead of just
writing and forgetting.

The practice comes from Harvard professor **Arthur C. Brooks**, who
has his students keep a weekly gratitude list to train metacognition.

## How it works

- **Sunday** — write your list. Five short, honest things you're
  grateful for this week. You can carry over last week's list if
  nothing's changed, or start fresh.
- **Monday–Saturday** — reflect. Each night, click through your five
  things one at a time — no typing, just reading. A progress tracker
  shows how many nights you've reflected this week.
- Come back the next Sunday and do it again.

The whole app is one flow: **login → home → write list → reflect →
done**, with no accounts, servers, or sync — everything lives in the
browser.

## Tech stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vitejs.dev/) for dev/build tooling
- CSS Modules for styling (no CSS framework)
- [Oxlint](https://oxc.rs) for linting
- `localStorage` as the only persistence layer — no backend

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to `http://localhost:5173`).

### Scripts

| Command           | Does                                      |
| ------------------ | ------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR         |
| `npm run build`   | Type-check (`tsc -b`) and build for production |
| `npm run preview` | Serve the production build locally         |
| `npm run lint`    | Run Oxlint                                  |

## Project structure

```
src/
  App.tsx                 # Screen router + top-level state (data, current screen)
  screens/                # One component + CSS module per screen
    LoginScreen.tsx        #   name entry
    HomeScreen.tsx         #   weekly status, entry point to list/reflection
    ListEditorScreen.tsx   #   write/edit the 5 things for the week
    ReflectionScreen.tsx   #   one-at-a-time nightly reflection
    CompletionScreen.tsx   #   celebratory "done for tonight" screen
  components/             # Shared UI: Button, Logo, WeekProgress
  lib/
    types.ts               # AppData / WeekList shape
    storage.ts              # localStorage read/write helpers
    dateUtils.ts             # week-start math, reflection-night rules
  theme.ts                 # Shared color palette + fonts
```

## Data model

Everything is stored under a single `localStorage` key
(`cheerful.app-data.v1`) as one JSON blob:

```ts
interface AppData {
  userName: string;
  lists: Record<string, WeekList>;          // weekStart (ISO date) -> that week's 5 things
  reflectedNights: Record<string, string[]>; // weekStart -> ISO dates reflected that week
}
```

A "week" is keyed by the ISO date of the Sunday it starts on
([`getWeekStart`](src/lib/dateUtils.ts)). Reflection nights run
Monday–Saturday; Sunday is reserved for writing that week's list.

## Notes for contributors

- There's no router or global state library — `App.tsx` holds one
  `screen` value and renders the matching screen component. If you add
  a screen, wire it in there.
- Styling is per-screen CSS Modules (`ScreenName.module.css`) plus a
  shared `colors` object in [`theme.ts`](src/theme.ts) for anything
  that needs inline styles.
- There's no test suite yet — verify changes by running `npm run dev`
  and walking through the Sunday-write → nightly-reflect flow by hand.
