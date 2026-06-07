// pages/auth.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AuthPage extends BasePage {
    private readonly signupNameInput: Locator;
    private readonly signupEmailInput: Locator;
    private readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
    }

    async initiateSignup(name: string, email: string): Promise<void> {
        await this.type(this.signupNameInput, name);
        await this.type(this.signupEmailInput, email);
        await this.click(this.signupButton);
    }
}