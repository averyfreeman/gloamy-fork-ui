# Browser UI and desktop source ownership

The browser UI repository owns the shared Vue routes, components, responsive
navigation, and accessibility work. The desktop repository owns the Tauri host,
daemon lifecycle, local pairing recovery, preferences, native menu, and release
packaging. It pins this repository as the `ui/` submodule so each desktop build
uses a reviewable, exact UI commit.

The desktop build copies the pinned UI into an ignored build directory and
injects a small typed platform adapter. Shared screens stay here; the desktop
repository does not maintain a patch of authentication or settings pages.

## UI update flow

When a UI source, dependency, build, test, or accessibility-roadmap change lands
on `main`, the **Sync desktop UI pin** workflow checks whether an open desktop
PR already pins that exact UI commit. If not, it updates the open `codex/ui-sync`
PR branch or opens a pin PR on that branch. This lets a desktop implementation
PR on the same branch advance to the merged UI commit without creating a second
PR. The desktop CI checks shared browser behavior and the Tauri adapter behavior
before the pin can be merged. Documentation-only changes outside the
accessibility roadmap do not create desktop pin PRs.

The workflow uses a GitHub App installation token limited to
`gloamy-fork-desktop-ui`. To enable it, install an App on that repository with
**Contents: Read and write** and **Pull requests: Read and write**, then set
these values in this repository's Actions settings:

- Variable `DESKTOP_SYNC_APP_ID`: the App's client ID.
- Secret `DESKTOP_SYNC_APP_PRIVATE_KEY`: a private key for that App.

The workflow requests only those two repository permissions. Do not commit the
private key or add it to a workflow file. The sync job cannot create a PR until
the App installation and settings are configured.

## Accessibility scope

The desktop consumes the same shared responsive and accessibility fixes as the
browser UI. The [WCAG 2.2 A/AA roadmap](accessibility/wcag-2.2-aa-roadmap.md)
also lists the conditional desktop controls that require audit. The roadmap is
not a conformance claim; automated adapter tests do not replace manual review.
