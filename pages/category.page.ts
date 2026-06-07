// pages/category.page.ts
import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CategoryPage extends BasePage {
  private readonly titleTitleBlock: Locator;
  private readonly productItems: Locator;

  constructor(page: Page) {
    super(page);
    this.titleTitleBlock = page.locator('.features_items .title');
    this.productItems = page.locator('.col-sm-4');
  }

  async verifyCategoryHeader(expectedHeader: string): Promise<void> {
    await this.verifyElementContainsText(this.titleTitleBlock, expectedHeader);
  }

  async verifyProductsAreListed(): Promise<void> {
    const count = await this.productItems.count();
    expect(count).toBeGreaterThan(0);
  }
}