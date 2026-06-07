# Playwright Assignment

This repository contains Playwright end-to-end tests and a simple page-object test framework used for the Automation Exercise demo.

**Quick links**
- Project: [package.json](package.json)
- Playwright config: [playwright.config.ts](playwright.config.ts)

## Prerequisites
- Node.js 18+ (or compatible LTS)
- npm (or yarn)

## Clone

```bash
git clone https://github.com/SUSHIL177/playwrightAssignment.git
cd playwrightAssignment
```

## Install dependencies

```bash
npm install
# Install Playwright browsers (required first time)
npx playwright install
```

## Run the tests

- Preferred (project npm script used in this repo):

```bash
npm run test:qa:regression
```

- Direct Playwright alternatives:

```bash
# run full test suite (headless)
npx playwright test

# run tests in headed Chromium (useful when debugging)
npx playwright test --project=chromium --headed

# run a single spec file
npx playwright test tests/automation-exercise.spec.ts

# run a single test by title
npx playwright test -g "Execute fully-validated workflow"
```

## Viewing failures and traces

- When a test generates a trace or video, open it with:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Recommended .gitignore

Don't commit large test artifacts. Add the following to `.gitignore`:

```
playwright-report/
trace/
test-results/
node_modules/
```

If these artifacts are already committed and causing slow pushes, I can help remove them from the history or migrate to Git LFS.

## Project structure (brief)

- pages/: Page object classes used by tests (e.g. [pages/home.page.ts](pages/home.page.ts), [pages/products.page.ts](pages/products.page.ts)).
- tests/: Playwright test specs (e.g. [tests/automation-exercise.spec.ts](tests/automation-exercise.spec.ts)).
- data/: test data and fixtures.
- utils/: helper utilities (data generators, helpers).
- playwright.config.ts: Playwright configuration (projects, timeouts, reporters).
- package.json: scripts and dependencies. Use `npm test` or `npx playwright test`.

## Useful npm scripts

If `package.json` includes scripts, run them via:

```bash
npm test
# or, if defined:
npm run test:debug
```


