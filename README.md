# Playwright Automation Exercise

Playwright Test automation for [Automation Exercise](https://automationexercise.com). The project includes browser-based end-to-end checks and direct REST API tests.

## Requirements

- Node.js (use an active LTS release)
- npm

## Setup

Install project dependencies and the browsers used by Playwright:

```bash
npm ci
npx playwright install
```

The default target is `https://automationexercise.com`. To use another environment, copy `.env.example` to `.env` and set `BASE_URL`:

```bash
cp .env.example .env
```

```dotenv
BASE_URL=https://automationexercise.com
```

The local `.env` file is gitignored. Do not put credentials or other secrets in `.env.example`.

## Running tests

| Command | What it runs |
| --- | --- |
| `npm test` | All configured tests across Chromium, Firefox, WebKit, and the API project |
| `npm run test:chromium` | Browser tests in Chromium |
| `npm run test:api` | API specs once, in the API project |
| `npm run test:e2e` | Tests tagged `@e2e` across all configured projects |
| `npm run test:smoke` | Tests tagged `@smoke` across all configured projects |
| `npm run test:regression` | Tests tagged `@regression` across all configured projects |
| `npm run test:ui` | Open Playwright's interactive UI runner |

You can narrow a command to one browser or spec, for example:

```bash
npm run test:e2e -- --project=chromium
npx playwright test tests/e2e/signup-checkout.spec.ts --project=chromium
```

## Project layout

```text
.
├── .github/workflows/       # GitHub Actions workflow
├── src/
│   ├── api/                 # API helpers used by tests
│   ├── components/          # Reusable UI components (Header, Footer)
│   ├── pages/               # Page Object Model classes
│   └── utils/               # Test-data generators and utilities
├── tests/
│   ├── api/                 # REST API specs
│   └── e2e/                 # Browser end-to-end specs
├── .env.example             # Example local configuration
├── package.json             # Dependencies and npm scripts
└── playwright.config.ts     # Playwright runner configuration
```

### Page objects and components

Page objects in `src/pages/` encapsulate page-specific navigation, locators, and actions. `BasePage` provides shared `Header` and `Footer` components. Tests should use these abstractions for recurring page interactions instead of repeating selectors and actions inline.

### Test data and API helpers

`src/utils/test-data.ts` exports `createTestUser()`, which generates a fresh user and unique email for account tests. `src/api/account-api.ts` contains the account deletion helper used to clean up the user created during the signup-and-checkout UI test.

API tests in `tests/api/` use Playwright's `request` fixture to call the target site's REST API directly, without opening a browser.

## Tags and suites

Tags are declared with Playwright's `test.describe` options and inherited by tests in that suite:

- `@smoke` — quick checks of primary pages and catalog API responses.
- `@regression` — page checks and signup/checkout behavior.
- `@e2e` — browser journeys that exercise a user flow end to end.
- `@api` — direct API behavior.

The page smoke checks carry `@smoke`, `@regression`, and `@e2e`. Signup and checkout carry `@regression` and `@e2e`. Catalog API checks carry `@api` and `@smoke`.

## Playwright configuration

`playwright.config.ts` loads `.env` with dotenv and sets `use.baseURL` from `BASE_URL`, falling back to `https://automationexercise.com`. Browser projects cover desktop Chromium, Firefox, and WebKit; those projects exclude `tests/api/`. The `api` project matches `tests/api/**/*.spec.ts` and runs the API tests once without launching a browser.

Tests run in parallel by default. On CI, Playwright forbids `test.only`, retries failures twice, and uses one worker. The HTML report is generated after runs; view it with:

```bash
npx playwright show-report
```

The GitHub Actions workflow runs the full Playwright suite on pushes and pull requests targeting `main` or `master`, and uploads the HTML report as an artifact.

## Current coverage

- **UI smoke checks:** home page featured items, login/signup form visibility, products listing, and empty cart state.
- **Signup and checkout:** creates a unique account through the UI, adds a product, submits a demo order, then deletes the test account through the REST API.
- **Catalog API:** product list, brand list, and product search.

The UI flow and API tests use the configured target environment. The signup-and-checkout spec creates an account and submits an order there, so run it only against an environment where those test actions are acceptable. Its account is deleted through the API after the test; the order itself may remain in the site's test data.

## Adding tests

1. Add browser specs under `tests/e2e/` or API specs under `tests/api/`.
2. Put reusable UI behavior in `src/components/` and `src/pages/`; put API helpers in `src/api/`.
3. Use `createTestUser()` or another isolated data generator for tests that create resources.
4. Add the appropriate tags to the test suite and verify the corresponding npm script includes the intended tests.
5. Run the targeted test command first, then the broader suite when appropriate.
