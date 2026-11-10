import type { Locator, Page } from '@playwright/test';

export class Footer {
  private readonly emailInput: Locator;
  private readonly subscribeButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    const root = page.locator('#footer');
    this.emailInput = root.getByPlaceholder('Your email address');
    this.subscribeButton = root.locator('#subscribe');
    this.successMessage = root.locator('#success-subscribe .alert-success');
  }

  async subscribe(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.subscribeButton.click();
  }
}
