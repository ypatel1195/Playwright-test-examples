# Playwright Test Examples

Test cases with examples using Playwright and TypeScript.

## Page Object Model (POM) Implementation

This project uses the Page Object Model pattern to organize test code and improve maintainability.

### Structure

```
Playwright-test-examples/
├── login_page.ts          # Page Object Model for Login Page
├── login_pom_test.ts      # Tests using the POM pattern
└── login.ts               # Example tests (alternative approach)
```

### Login Page POM

The `LoginPage` class (`login_page.ts`) provides:

- **Locators**: Centralized element selectors
- **Methods**: Reusable page interactions
- **Utilities**: Helper methods for common operations

**URL**: https://qa-practice.razvanvancea.ro/auth_ecommerce.html

**Valid Credentials**:
- Email: `admin@admin.com`
- Password: `admin123`

### Usage Example

```typescript
import { test } from '@playwright/test';
import { LoginPage } from './login_page';

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@admin.com', 'admin123');
  // Assert login success...
});
```

### Available Methods

- `goto()` - Navigate to login page
- `login(email, password)` - Complete login flow
- `loginWithValidCredentials()` - Login with default valid credentials
- `fillEmail(email)` - Fill email field
- `fillPassword(password)` - Fill password field
- `clickSubmit()` - Click submit button
- `verifyLoginFormElements()` - Verify form elements are visible
- `isErrorMessageVisible()` - Check if error message is displayed
- And more...

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

- Run all tests: `npm test`
- Run with UI: `npm run test:ui`
- Run in headed mode: `npm run test:headed`
- Debug tests: `npm run test:debug`
- Run specific browser: `npm run test:chromium`

## Configuration

See `playwright.config.ts` for configuration options including:
- Browser projects (Chrome, Firefox, Safari, Mobile)
- Screenshot and video capture on failure
- Retry logic
- Test reporters
