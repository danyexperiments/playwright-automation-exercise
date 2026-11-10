import { expect, test } from '@playwright/test';
import { deleteAccount } from '../../src/api/account-api';
import { LoginPage } from '../../src/pages/LoginPage';
import { createTestUser, type TestUser } from '../../src/utils/test-data';

test.describe('Signup and checkout regression', { tag: ['@regression', '@e2e'] }, () => {
  let userForCleanup: TestUser | undefined;

  test.afterEach(async ({ request }) => {
    if (userForCleanup) {
      await deleteAccount(request, userForCleanup);
      userForCleanup = undefined;
    }
  });

  test('a new user can sign up and complete checkout', async ({ page }) => {
    userForCleanup = undefined;
    const user = createTestUser();
    const loginPage = new LoginPage(page);

    await loginPage.open();
    const consentButton = page.getByRole('button', { name: 'Consent', exact: true });
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }
    await expect(loginPage.signupForm).toBeVisible();
    await loginPage.signup(user.name, user.email);

    await expect(page.getByRole('heading', { name: /enter account information/i })).toBeVisible();
    await page.locator('#id_gender1').check();
    await page.locator('#password').fill(user.password);
    await page.locator('#days').selectOption('15');
    await page.locator('#months').selectOption('6');
    await page.locator('#years').selectOption('1990');
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();
    await page.locator('#first_name').fill(user.firstName);
    await page.locator('#last_name').fill(user.lastName);
    await page.locator('#company').fill(user.company);
    await page.locator('#address1').fill(user.address);
    await page.locator('#country').selectOption({ label: 'India' });
    await page.locator('#state').fill(user.state);
    await page.locator('#city').fill(user.city);
    await page.locator('#zipcode').fill(user.zipCode);
    await page.locator('#mobile_number').fill(user.mobileNumber);
    await page.getByRole('button', { name: 'Create Account', exact: true }).click();

    await expect(page.getByRole('heading', { name: /account created/i })).toBeVisible();
    userForCleanup = user;
    await page.getByRole('link', { name: 'Continue', exact: true }).click();
    await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

    const product = page.locator('.features_items .product-image-wrapper').filter({ hasText: 'Blue Top' });
    await product.hover();
    await product.locator('a.add-to-cart').first().click();
    await page.locator('#cartModal').getByRole('button', { name: 'Continue Shopping' }).click();

    await page.goto('/view_cart');
    await expect(page.locator('#cart_info_table')).toContainText('Blue Top');
    await page.getByText('Proceed To Checkout', { exact: true }).click();
    await expect(page.getByRole('heading', { name: /address details/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /review your order/i })).toBeVisible();

    await page.locator('textarea[name="message"]').fill('Please deliver during business hours.');
    await page.getByRole('link', { name: 'Place Order', exact: true }).click();
    await page.locator('[data-qa="name-on-card"]').fill(`${user.firstName} ${user.lastName}`);
    await page.locator('[data-qa="card-number"]').fill('1234567890123456');
    await page.locator('[data-qa="cvc"]').fill('123');
    await page.locator('[data-qa="expiry-month"]').fill('12');
    await page.locator('[data-qa="expiry-year"]').fill('2030');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();
  });
});
