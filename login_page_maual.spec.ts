import { test, expect } from '@playwright/test';
import { LoginPOMManual } from './utility/login_pom_manual';

/**
 * Test Suite using LoginPOMManual Page Object Model
 * Tests for: https://qa-practice.razvanvancea.ro/auth_ecommerce.html
 */

test.describe('Login Page - Manual POM Tests', () => {
  let loginPage: LoginPOMManual;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPOMManual(page);
    await page.goto(loginPage.url);
  });

  test('should display login form elements', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.emailInput.fill('admin@admin.com');
    await loginPage.passwordInput.fill('admin123');
    await loginPage.submitButton.click();
    
    // Wait for page to respond
    await page.waitForTimeout(3000);
    
    // Verify navigation away from login page or shopping content appears
    const currentUrl = page.url();
    const hasShoppingContent = await page.locator('text=/shop|cart|products|add to cart/i').first().isVisible().catch(() => false);
    
    expect(hasShoppingContent || !currentUrl.includes('auth_ecommerce')).toBeTruthy();
  });

  test('should handle invalid credentials', async ({ page }) => {
    await loginPage.emailInput.fill('invalid@example.com');
    await loginPage.passwordInput.fill('wrongpassword');
    await loginPage.submitButton.click();
    
    await page.waitForTimeout(2000);
    
    // Should still be on login page or show error
    const isErrorVisible = await loginPage.errorMessage.isVisible().catch(() => false);
    const currentUrl = page.url();
    const isStillOnLoginPage = currentUrl.includes('auth_ecommerce');
    
    expect(isErrorVisible || isStillOnLoginPage).toBeTruthy();
  });
});