# Gloamy Vue UI

Gloamy Vue UI is the browser interface for the Gloamy daemon. It is maintained
in its own repository and is also included as the `web` submodule of the parent
[`gloamy-app-server-oauth2`](https://github.com/averyfreeman/gloamy-app-server-oauth2)
repository.

The app is built with:

- [Vue 3](https://vuejs.org/) with [Vite](https://vite.dev/) and TypeScript.
- [Pinia](https://pinia.vuejs.org/) for state, [Vue Router](https://router.vuejs.org/) for navigation.
- [Tailwind CSS v4](https://tailwindcss.com/) + [reka-ui](https://reka-ui.com/) for the component layer.
- [vue-i18n](https://vue-i18n.intlify.dev/) for localization.

It is a thin client over the Gloamy daemon's REST + SSE API. All application
logic lives in the daemon; this app only renders and talks HTTP.

## Prerequisites

- Node.js (see `.nvmrc`) and [pnpm](https://pnpm.io/).
- A running Gloamy daemon. From the parent Rust repository root:

  ```bash
  cargo run -- daemon
  ```

  The daemon listens on `http://127.0.0.1:42617` by default.

  To run the daemon and this app together in containers, clone the parent
  repository with submodules and follow its
  [Docker deployment guide](https://github.com/averyfreeman/gloamy-app-server-oauth2/blob/main/docs/docker-deployment.md).

For a complete parent checkout, use:

```bash
git clone --recurse-submodules https://github.com/averyfreeman/gloamy-app-server-oauth2.git
```

## Development

Install dependencies from this repository root:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

The app is served at <http://localhost:1420>.

### How the app reaches the daemon

The client calls the daemon over **same-origin paths** (`/api/*` and `/pair`), so
the browser never needs CORS and HTTPS pages never hit mixed-content errors.
The dev server forwards those paths to the daemon.

Point it at a daemon on a different host or port with:

```bash
GLOAMY_DAEMON_URL=http://192.168.1.20:42617 pnpm dev
```

To bypass the proxy entirely and call a daemon origin directly, set
`VITE_GLOAMY_API_BASE` — that daemon must then allow this app's origin via CORS.
The base URL is also editable at runtime on the authentication screen and is
persisted per browser.

## Pairing

The daemon issues a pairing code; enter it on the authentication screen to
exchange it for a bearer token. The token is stored in the browser's
`localStorage` under the `gloamy:` key prefix, so pairing is per-browser and
signing out on one browser does not affect another.

## Building

```bash
pnpm build      # type-checks, then emits dist/
pnpm preview    # serves dist/ with the same daemon proxy
```

`dist/` is a static bundle. The router uses hash history, so it can be served
from any static host with no rewrite rules. Whatever serves `dist/` in a
deployment must forward `/api/*` and `/pair` to the daemon for the same-origin
contract to hold.

## Other commands

```bash
pnpm lint       # Oxlint for JS/TS and Vue scripts; ESLint for Vue templates
pnpm lint:fix   # Run both linters with auto-fix
pnpm typecheck  # Vue SFCs, Vite config, tests, and TypeScript validation
pnpm test:unit  # Unit tests in happy-dom
pnpm test       # Unit tests, production build, and browser smoke tests
```

The browser smoke tests run against the production preview and mock daemon HTTP
requests. Install Chromium once with `pnpm exec playwright install chromium`;
run `pnpm build` before invoking `pnpm test:smoke` directly. The `pnpm test`
command builds automatically. UI-only checks run in this repository's GitHub
Actions workflow. The parent repository separately validates daemon behavior.

## Accessibility

The UI is being made responsive and is not yet declared WCAG conformant. See
the [WCAG 2.2 Level A and AA roadmap](docs/accessibility/wcag-2.2-aa-roadmap.md)
for the criterion inventory, audit scope, and verification plan.
