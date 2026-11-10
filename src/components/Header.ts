import type { Locator, Page } from '@playwright/test';

export type HeaderNavigationItem =
  | 'Home'
  | 'Products'
  | 'Cart'
  | 'Signup / Login'
  | 'Test Cases'
  | 'API Testing'
  | 'Video Tutorials'
  | 'Contact us';

export class Header {
  private readonly logo: Locator;
  private readonly navigation: Locator;

  constructor(page: Page) {
    const root = page.locator('#header');
    this.logo = root.locator('.logo a');
    this.navigation = root.locator('.shop-menu');
  }

  async goToHome(): Promise<void> {
    await this.logo.click();
  }

  async open(item: HeaderNavigationItem): Promise<void> {
    await this.navigation.getByRole('link', { name: item, exact: true }).click();
  }
}
