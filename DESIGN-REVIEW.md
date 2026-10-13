# Design review

## Direction

The certificate itself is the visual focus. The workspace uses ink blue (#23476b), dark text (#243449), white (#ffffff), pale blue (#e8eff7), a cool canvas (#f4f7fb), and restrained gold (#b38b43). System sans-serif type keeps controls familiar and available offline; Georgia is used for certificate typography.

Desktop uses persistent navigation, a compact summary strip, folder filters, and a responsive certificate gallery. Mobile shows labeled navigation and a single-column gallery. Print controls sit beside a large preview and stack on smaller screens.

## Changes

- Increased interface text sizes and contrast; removed decorative headline text, fake initials, and the registered-trademark mark.
- Reduced decorative card movement and respected reduced-motion preferences.
- Changed certificate typography to scale relative to the preview.
- Kept navigation labels visible on mobile and made previews keyboard accessible with visible focus indicators.
- Added descriptive dialog titles and current-page navigation state.
- Replaced the duplicate overview gallery with a three-step workflow guide.
- Added empty states, scrollable participant tables, selected-participant printing, and disabled print actions when data is missing.
- Reported storage failures instead of always claiming changes were saved.

## Verification

JavaScript syntax and dependency-free application logic checks pass. Browser review could not run because the in-app browser connection returned an infrastructure error. Desktop/mobile screenshots, visual accessibility, and actual print output remain unverified.
