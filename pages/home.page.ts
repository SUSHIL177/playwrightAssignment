// pages/home.page.ts
import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
    private readonly logo: Locator;
    private readonly navBar: Locator;
    private readonly signupLoginLink: Locator;
    private readonly productsLink: Locator;
    private readonly loggedInAsText: Locator;
    private readonly categoryWomenLink: Locator;
    private readonly categoryDressLink: Locator;
    private readonly brandPoloLink: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = page.locator('.logo img');
        this.navBar = page.locator('.shop-menu');
        this.signupLoginLink = page.locator('a[href="/login"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.loggedInAsText = page.locator('text=Logged in as');

        // Sidebar locators
        this.categoryWomenLink = page.locator('a[href="#Women"]');
        this.categoryDressLink = page.locator('a[href="/category_products/1"]');
        this.brandPoloLink = page.locator('a[href="/brand_products/Polo"]');

    }

    async verifyHomePageLoaded(): Promise<void> {
        await this.verifyElementVisible(this.logo);
        await this.verifyElementVisible(this.navBar);
    }

    async goToSignupLogin(): Promise<void> {
        await this.click(this.signupLoginLink);
    }

    async goToProducts(): Promise<void> {
        await this.click(this.productsLink);
    }

    async verifyLoggedInUser(username: string): Promise<void> {
        await this.verifyElementVisible(this.loggedInAsText);
        await this.verifyElementContainsText(this.loggedInAsText, username);
    }

    async selectWomenDressCategory(): Promise<void> {

        await this.page.waitForLoadState('domcontentloaded');

        await this.click(this.categoryWomenLink);

        const isDressVisible = this.categoryDressLink.isVisible()

        if (!isDressVisible) {
            await this.click(this.categoryWomenLink);
            await this.categoryDressLink.waitFor({ state: 'visible', timeout: 3000 });
        }

        await this.click(this.categoryDressLink);
    }

    async selectPoloBrand(): Promise<void> {
        await this.click(this.brandPoloLink);
    }

}