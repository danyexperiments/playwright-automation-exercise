import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly featuredItemsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.featuredItemsHeading = page.getByRole('heading', { name: 'Features Items' });
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
  }
}
