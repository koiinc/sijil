# Certificate Studio

A browser-based app for managing certificate designs, participant records, and printing certificates with unique identifiers.

## Run

Open `dist/index.html` in a browser. Participant records and uploaded backgrounds are stored in that browser's local storage.

## Design skill

The project includes Anthropic's `frontend-design` skill in `.agents/skills/frontend-design`.
Source: https://github.com/anthropics/skills/tree/main/skills/frontend-design

Open this project folder in Codex to use its project-scoped skill on your next turn.

## GitHub Pages

The included `.github/workflows/pages.yml` publishes `dist/` after pushes to `main`.

1. Upload this project to your GitHub repository, including `.github/`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Push to `main`, or run **Publish certificate studio** from the Actions tab.
4. Open the deployment URL after the workflow succeeds.

Only `dist/` is published. Participant records and uploads stay in each visitor's browser; they are not uploaded to GitHub or shared between devices. Three fictional participants are included as examples; edit or delete them before printing real certificates.

For printing, choose A4 landscape, turn off browser headers and footers, and enable background graphics. Use Save as PDF to download certificates.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

The existing Sites identity remains in the ignored `.openai/` directory locally. It is not needed for GitHub Pages.

## Validation

Run `node --check dist/app.js` and `node tests/app.test.cjs`.

Logic tests cover CSV quoting, atomic imports, unique IDs, certificate escaping, navigation rendering, empty states, and participant-to-certificate mapping. They use a minimal document stub and do not validate browser layout or physical print output.

Export participant CSVs and workspace JSON backups before clearing browser data. JSON export archives the workspace; automatic JSON restoration is not yet implemented. Participant CSVs can be imported into an empty workspace.
