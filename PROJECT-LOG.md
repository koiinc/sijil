# Project log

## 13 October 2026 — Initial release wrapped

Status: initial build and GitHub publication complete. Next phase: user test session, followed by the user's improvement list.

- Project: Folio certificate studio (sijil).
- Repository: https://github.com/koiinc/sijil
- Live app: https://koiinc.github.io/sijil/
- Release source commit: 1bfc4647079d755346aac32c58fff7e295c09677.
- Delivered: six built-in certificate styles, uploaded backgrounds, design folders, participant entry and CSV import/export, unique certificate IDs, certificate previews, individual/batch printing, and browser-local persistence.
- Design review: improved typography, contrast, mobile navigation, preview scaling, keyboard access, empty states, and print controls.
- Validation: JavaScript syntax and application logic checks passed locally and in GitHub Actions. The live page, app.js, style.css, and polish.css each returned HTTP 200 in the latest deployment check.
- Verification limits: the in-app browser connection failed. Visual layout, accessibility in a real browser, uploaded-background placement, actual printing, and PDF output are not yet verified.
- Known behavior: records are local to each browser/device; workspace JSON export is supported, but JSON restoration is not implemented. Three fictional participants are included as examples.

### Next: test session

Test the deployed release before proposing improvements. No new feature changes are planned until feedback is collected.

1. Review desktop and mobile navigation, readability, and certificate previews.
2. Create a design folder, upload a background, and adjust name/ID positions.
3. Add/edit participants; import CSVs with quoted fields, missing IDs, and duplicate IDs.
4. Check that every preview and printed certificate matches the participant's name and unique ID.
5. Print one participant and a batch; save to PDF and check page size, backgrounds, alignment, and page breaks.
6. Reload the browser to check persistence; export participants and a workspace backup.
7. Record each issue with the action taken, expected result, actual result, browser/device, and a screenshot where useful.

After the test session, the user will list improvements for the next iteration.
