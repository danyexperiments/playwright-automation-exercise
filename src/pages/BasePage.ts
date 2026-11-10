import type { Page } from '@playwright/test';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export class BasePage {
  readonly header: Header;
  readonly footer: Footer;

  constructor(protected readonly page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  protected async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }
}
