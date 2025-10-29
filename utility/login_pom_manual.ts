import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Login Page
 * URL: https://qa-practice.razvanvancea.ro/auth_ecommerce.html
 */
export class LoginPOMManual {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly pageTitle: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        
        // Email input - try getByLabel first (most reliable), then fallback to standard selectors
        this.emailInput = page.getByLabel('Email', { exact: false })
            .or(page.locator('input[type="email"]'))
            .or(page.locator('input[name="email"]'))
            .or(page.locator('input[id="email"]'))
            .first();
        
        // Password input
        this.passwordInput = page.getByLabel('Password', { exact: false })
            .or(page.locator('input[type="password"]'))
            .or(page.locator('input[name="password"]'))
            .or(page.locator('input[id="password"]'))
            .first();
        
        // Submit button
        this.submitButton = page.getByRole('button', { name: /submit/i })
            .or(page.locator('button[type="submit"]'))
            .or(page.locator('button:has-text("Submit")'))
            .or(page.locator('input[type="submit"]'))
            .first();
        
        this.pageTitle = page.locator('h1');
        this.errorMessage = page.locator('text=/Invalid|Error|Wrong credentials/i');
        this.successMessage = page.locator('text=/Login successful|Welcome|Success/i');
        this.url = 'https://qa-practice.razvanvancea.ro/auth_ecommerce.html';
    }

}
