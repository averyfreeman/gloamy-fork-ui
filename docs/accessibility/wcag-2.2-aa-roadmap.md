# WCAG 2.2 Level A and AA roadmap

This roadmap is the UI team's working requirements and audit plan. It is not a
conformance claim. A WCAG 2.2 AA claim applies to each complete page and every
responsive presentation, and requires all applicable Level A and AA criteria to
be met. See the [W3C Recommendation](https://www.w3.org/TR/WCAG22/) for the
normative requirements and definitions.

## Product scope

Audit every route (`/`, `/cowork`, `/tools`, `/scheduled`, `/integrations`,
`/memory`, `/configuration`, `/logs`, `/doctor`, `/authentication`, and
`/settings`), dialogs and overlays, loading/error/empty states, and content
rendered from the daemon. Include 320 CSS px, 375 CSS px, 768 CSS px, 1024 CSS
px, desktop, 200% text zoom, and text-spacing overrides. The UI must remain
usable with keyboard alone and with browser zoom; mobile compatibility does not
mean a separate native iOS or Android application.

Status meanings:

- **Implemented in this change**: the shared-shell or responsive behavior was
  added here; route-wide verification remains required.
- **Audit required**: verify the criterion on every applicable route and fix
  failures before considering a conformance claim.
- **Conditional**: apply when the described content or process exists; review
  whenever that feature is introduced.

## Criteria inventory

The inventory lists every WCAG 2.2 Level A and AA success criterion. The short
intent statements below are planning notes; the W3C text is normative.

| Criterion | Level | Gloamy surfaces and verification plan | Initial status |
|---|---:|---|---|
| 1.1.1 Non-text Content | A | Icons, charts, logos, status indicators, and image controls; inspect accessible names and text alternatives with a screen reader and accessibility tree. | Audit required |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | Applies if help, tutorials, or other prerecorded media is added; verify equivalent transcript or media alternative. | Conditional |
| 1.2.2 Captions (Prerecorded) | A | Applies to prerecorded synchronized media; verify captions for all speech and meaningful sounds. | Conditional |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) | A | Applies to prerecorded video; verify equivalent visual information is available. | Conditional |
| 1.2.4 Captions (Live) | AA | Applies to live synchronized media; provide synchronized captions for live audio. | Conditional |
| 1.2.5 Audio Description (Prerecorded) | AA | Applies to prerecorded video; provide audio description for meaningful visual information. | Conditional |
| 1.3.1 Info and Relationships | A | All route headings, form labels, navigation, lists, tables, and validation; inspect semantics and screen-reader output. | Audit required |
| 1.3.2 Meaningful Sequence | A | DOM order for responsive navigation, cards, configuration forms, tables, and dialogs; compare reading order at narrow and wide layouts. | Audit required |
| 1.3.3 Sensory Characteristics | A | Instructions and error messages; confirm they do not rely only on color, shape, position, or sound. | Audit required |
| 1.4.1 Use of Color | A | Status badges, charts, active navigation, and errors; confirm text, icons, or patterns also convey meaning. | Audit required |
| 1.4.2 Audio Control | A | Applies if audio can play for more than three seconds; verify pause/stop or independent volume control. | Conditional |
| 2.1.1 Keyboard | A | Every route, menu, editor, table action, setup dialog, and control; operate using Tab, Shift+Tab, Enter, Space, and arrow keys where appropriate. | Audit required |
| 2.1.2 No Keyboard Trap | A | Dialogs, mobile navigation drawer, editors, and embedded content; enter and leave each widget using keyboard only. | Audit required |
| 2.1.4 Character Key Shortcuts | A | Cowork and any future keyboard shortcuts; verify single-character shortcuts can be disabled, remapped, or are active only on focus. | Conditional |
| 2.2.1 Timing Adjustable | A | Pairing, OAuth device-code authorization, and session-expiry flows; verify limits can be extended or restarted without losing entered work. | Audit required |
| 2.2.2 Pause, Stop, Hide | A | Live logs, animated progress, and auto-updating status; provide pause/stop controls or ensure the criterion's exceptions apply. | Audit required |
| 2.3.1 Three Flashes or Below Threshold | A | All animated and streamed UI; inspect for flashing content and verify any flashes remain below threshold. | Audit required |
| 2.4.1 Bypass Blocks | A | Shared sidebar and repeated shell regions; provide a skip link or equivalent bypass to the route's main content. | Audit required |
| 2.4.2 Page Titled | A | All hash routes and authentication states; verify meaningful document titles update on navigation. | Audit required |
| 2.4.3 Focus Order | A | Route changes, drawers, dialogs, forms, and tables; trace keyboard sequence and confirm it preserves meaning and operation. | Audit required |
| 2.4.4 Link Purpose (In Context) | A | Router links and external documentation links; review accessible name and surrounding context. | Audit required |
| 2.5.1 Pointer Gestures | A | Canvas and any multi-point/trajectory interactions; verify a single-pointer alternative exists. | Conditional |
| 2.5.2 Pointer Cancellation | A | Buttons, clickable cards, and pointer-operated controls; verify activation occurs on up-event or can be aborted/undone. | Audit required |
| 2.5.3 Label in Name | A | Icon controls, sidebar toggle, dialogs, and form controls; compare accessible names with visible labels. | Audit required |
| 2.5.4 Motion Actuation | A | All actions; verify device movement is not required or can be disabled with a conventional control. | Audit required |
| 3.1.1 Language of Page | A | HTML document language for every route and authentication view; inspect `lang` and screen-reader pronunciation. | Audit required |
| 3.2.1 On Focus | A | Inputs, menus, and custom widgets; verify focus alone never changes context. | Audit required |
| 3.2.2 On Input | A | Filters, selectors, configuration controls, and search; verify changes do not unexpectedly navigate or submit. | Audit required |
| 3.2.6 Consistent Help | A | Help/contact links when present; verify they occur in a consistent relative order across routes. | Conditional |
| 3.3.1 Error Identification | A | Pairing, configuration, scheduling, and OAuth setup; identify invalid fields and errors in text. | Audit required |
| 3.3.2 Labels or Instructions | A | All forms, including API URL, credentials, schedules, and integration setup; verify labels and input instructions are programmatically associated. | Audit required |
| 3.3.7 Redundant Entry | A | Multi-step setup and configuration workflows; avoid asking users to re-enter information already supplied in the same process. | Audit required |
| 4.1.2 Name, Role, Value | A | Vue controls and Reka UI components; inspect the accessibility tree and verify names, roles, states, and value changes. | Audit required |
| 1.3.4 Orientation | AA | All routes at portrait and landscape orientations; verify no orientation lock unless essential. | Audit required |
| 1.3.5 Identify Input Purpose | AA | Authentication and profile/contact fields; use appropriate autocomplete tokens where a recognized purpose applies. | Audit required |
| 1.4.3 Contrast (Minimum) | AA | Text, placeholders, disabled states, themes, and status text; measure contrast against WCAG thresholds in light and dark themes. | Audit required |
| 1.4.4 Resize Text | AA | Every route at 200% text zoom; verify content and functionality remain available without loss. | Audit required |
| 1.4.5 Images of Text | AA | Logos and any image-based labels; confirm text is real text unless an allowed exception applies. | Audit required |
| 1.4.10 Reflow | AA | All routes at 320 CSS px wide and 400% zoom from a 1280 CSS px viewport; verify no two-dimensional scrolling except essential data. | Audit required |
| 1.4.11 Non-text Contrast | AA | Focus rings, input borders, icons, chart marks, and control states; measure contrast against adjacent colors. | Audit required |
| 1.4.12 Text Spacing | AA | Apply WCAG text-spacing overrides to every route; verify content and controls do not clip or overlap. | Audit required |
| 1.4.13 Content on Hover or Focus | AA | Tooltips, menus, popovers, and hover details; verify content is dismissible, hoverable, and persistent as required. | Audit required |
| 2.4.5 Multiple Ways | AA | Route discovery; verify navigation plus another way to locate routes, such as a sitemap or search. | Audit required |
| 2.4.6 Headings and Labels | AA | Route headings, dialogs, form fields, and controls; verify labels describe topic or purpose. | Audit required |
| 2.4.7 Focus Visible | AA | All keyboard-operable controls; verify visible focus in both themes and all responsive states. | Implemented in this change; audit required |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Sticky headers, drawer, dialogs, and scrollable panels; verify focused controls are not entirely hidden by author-created content. | Audit required |
| 2.5.7 Dragging Movements | AA | Canvas, sortable lists, and any drag operation; verify a single-pointer alternative that does not require dragging. | Conditional |
| 2.5.8 Target Size (Minimum) | AA | Controls on touch layouts; verify 24 by 24 CSS px target or a documented exception/spacing allowance. | Audit required |
| 3.1.2 Language of Parts | AA | Localized UI and user/API-provided content; mark passages whose language differs from the page language where needed. | Audit required |
| 3.2.3 Consistent Navigation | AA | Shared topbar/sidebar across authenticated routes; compare navigation order and placement. | Audit required |
| 3.2.4 Consistent Identification | AA | Repeated icons and controls; verify the same function has a consistent name and presentation. | Audit required |
| 3.3.3 Error Suggestion | AA | Forms and authorization flows; provide a correction suggestion when it is known and safe to disclose. | Audit required |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Configuration changes, deletion, and consequential actions; provide reversible review/confirmation where this criterion applies. | Audit required |
| 3.3.8 Accessible Authentication (Minimum) | AA | Pairing and sign-in; verify authentication does not require a cognitive function test unless a permitted exception applies. | Audit required |
| 4.1.3 Status Messages | AA | Save, refresh, loading, connection, and authorization status; verify updates are programmatically exposed without moving focus. | Audit required |

## Work sequence

1. Finish the responsive shell and keyboard-operable mobile drawer. The drawer
   has a labeled toggle, expanded state, Escape/outside-close behavior, focus
   restoration, and a keyboard focus boundary. Reduced-motion preferences are
   respected by shared CSS.
2. Audit each route and its full user journeys with keyboard-only navigation,
   screen-reader checks, automated accessibility inspection, and the viewport
   matrix above. Record reproducible failures as issues and link each fix to its
   criterion.
3. Fix high-impact barriers first: semantics and names, focus order/visibility,
   contrast, error handling, reflow, and target size. Repeat tests in light and
   dark themes and for loading, empty, error, and connected states.
4. Re-audit the complete process after each UI release. Do not mark a criterion
   conformant based only on an automated scan; document manual evidence and any
   third-party content boundaries.

## Responsive and keyboard behavior implemented here

- The authenticated shell collapses navigation into an off-canvas drawer below
  768 CSS px. The control announces expanded state and the drawer can be closed
  with Escape, its close control, or its backdrop.
- Opening the drawer moves focus inside it, Tab and Shift+Tab remain within it,
  and closing it restores focus to the toggle.
- Dashboard and Cowork grids reduce their column count at smaller breakpoints;
  long log, memory, and configuration tables expose horizontal scroll regions.
- Shared focus-visible treatment and reduced-motion CSS are enabled. These
  changes are not evidence that all routes meet WCAG 2.2 AA.
