import type { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginForm: Locator;
  readonly signupForm: Locator;

  constructor (page: Page) {
    super(page)
    this.loginForm = page.locator('.login-form form')
    this.signupForm = page.locator('.signup-form form')
  }

  async open (): Promise<void> {
    await this.navigateTo('/login')
  }

  async login (email: string, pass: string) {
    await this.loginForm.getByPlaceholder('Email Address').fill(email)
    await this.loginForm.getByPlaceholder('Password').fill(pass)
    await this.loginForm.getByRole('button', { name : 'Login'}).click()
  }

  async signup (name: string, email: string) {
    await this.signupForm.getByPlaceholder('Name').fill(name)
    await this.signupForm.getByPlaceholder('Email Address').fill(email)
    await this.signupForm.getByRole('button', { name : 'Signup'}).click()
  }
}
