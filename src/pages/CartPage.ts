import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = this.cartTable.locator('tbody tr');
    this.emptyMessage = page.getByText('Cart is empty!', { exact: false });
  }

  async open(): Promise<void> {
    await this.navigateTo('/view_cart');
  }

  rowForProduct(name: string): Locator {
    return this.cartRows.filter({ hasText: name });
  }

  async removeProduct(name: string): Promise<void> {
    await this.rowForProduct(name).getByRole('button').click();
  }
}
