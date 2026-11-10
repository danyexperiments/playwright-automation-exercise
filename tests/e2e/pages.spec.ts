import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/CartPage';
import { HomePage } from '../../src/pages/HomePage';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProductsPage } from '../../src/pages/ProductsPage';

test.describe('Page smoke checks', { tag: ['@smoke', '@regression', '@e2e'] }, () => {
  test('home page displays featured items', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await expect(homePage.featuredItemsHeading).toBeVisible();
  });

  test('login page displays login and signup forms', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.signupForm).toBeVisible();
  });

  test('products page displays the product list', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.open();
    await expect(productsPage.productsHeading).toBeVisible();
  });

  test('empty cart displays its empty-state message', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.open();
    await expect(cartPage.emptyMessage).toBeVisible();
  });
});
