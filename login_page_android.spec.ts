import { test, expect, devices } from '@playwright/test';
import { LoginPOMManual } from './utility/login_pom_manual';

/**
 * Android Device Test Suite for Login Page
 * Tests for: https://qa-practice.razvanvancea.ro/auth_ecommerce.html
 * 
 * This test suite validates the login page on Android device viewport
 * using Page Object Model from utility directory
 */

// Configure Android device viewport for all tests in this file
test.use({
  viewport: devices['Galaxy S5'].viewport,
  hasTouch: devices['Galaxy S5'].hasTouch,
  isMobile: devices['Galaxy S5'].isMobile,
});

test.describe('Login Page - Android Device Tests', () => {
  let loginPage: LoginPOMManual;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPOMManual(page);
    await page.goto(loginPage.url);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should validate login page elements on Android device', async ({ page }) => {
    // Validate page title is visible
    await expect(loginPage.pageTitle).toBeVisible();
    
    // Validate email input field
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.emailInput).toBeEnabled();
    
    // Validate password input field
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    
    // Validate submit button
    await expect(loginPage.submitButton).toBeVisible();
    await expect(loginPage.submitButton).toBeEnabled();
    
    // Validate we're on the correct URL
    await expect(page).toHaveURL(loginPage.url);
    
    // Validate page title text (Login - Shop)
    const pageTitleText = await loginPage.pageTitle.textContent();
    expect(pageTitleText).toContain('Login');
  });

  test('should login successfully with valid credentials on Android device', async ({ page }) => {
    // Validate page is loaded before login
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    
    // Fill in email
    await loginPage.emailInput.fill('admin@admin.com');
    await expect(loginPage.emailInput).toHaveValue('admin@admin.com');
    
    // Fill in password
    await loginPage.passwordInput.fill('admin123');
    await expect(loginPage.passwordInput).toHaveValue('admin123');
    
    // Click submit button
    await loginPage.submitButton.click();
    
    // Wait for navigation or response
    await page.waitForLoadState('networkidle');
    
    // Validate successful login - check for shopping cart or products
    const currentUrl = page.url();
    
    // Check for shopping content or successful navigation
    const hasShoppingContent = await page.locator('text=/SHOPPING CART|ADD TO CART|iPhone|Huawei|Samsung|Nokia/i').first().isVisible().catch(() => false);
    const isNotOnLoginPage = !currentUrl.includes('auth_ecommerce');
    
    // Additional check for success indicators
    const hasProductList = await page.locator('text=/Apple iPhone|Huawei Mate|Samsung Galaxy/i').first().isVisible().catch(() => false);
    
    // Validate successful login - at least one condition should be true
    expect(hasShoppingContent || hasProductList || isNotOnLoginPage).toBeTruthy();
    
    // Validate no error message is displayed
    const hasErrorMessage = await loginPage.errorMessage.isVisible().catch(() => false);
    expect(hasErrorMessage).toBeFalsy();
  });
});