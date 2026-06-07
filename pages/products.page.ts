// pages/products.page.ts
import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly productItems: Locator;
    private readonly productNames: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.productItems = page.locator('.single-products');
        this.productNames = page.locator('.productinfo p');
    }

    async searchProduct(term: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        await this.type(this.searchInput, term);
        await this.click(this.searchButton);
    }

    async verifyAllProductNamesContain(term: string): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        const names = await this.productNames.allTextContents();
        expect(names.length).toBeGreaterThan(0);
        for (const name of names) {
            expect(name.toLowerCase()).toContain(term.toLowerCase());
        }
    }

    async verifyNoProductsFound(): Promise<void> {
        // Assert that the product list containers are hidden or absent
        await expect(this.productItems).toHaveCount(0);
    }
}