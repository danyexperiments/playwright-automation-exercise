import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly productsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    super(page);
    this.productsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.productList = page.locator('.features_items .product-image-wrapper');
  }

  async open(): Promise<void> {
    await this.navigateTo('/products');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  productNamed(name: string): Locator {
    return this.productList.filter({ hasText: name });
  }
}
