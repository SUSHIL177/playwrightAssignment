// pages/signup.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SignupPage extends BasePage {
    private readonly titleMrRadio: Locator;
    private readonly passwordInput: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly addressInput: Locator;
    private readonly countrySelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcodeInput: Locator;
    private readonly mobileNumberInput: Locator;
    private readonly createAccountButton: Locator;
    private readonly accountCreatedHeading: Locator;

    constructor(page: Page) {
        super(page);
        this.titleMrRadio = page.locator('#id_gender1');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.countrySelect = page.locator('[data-qa="country"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.zipcodeInput = page.locator('[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    }

    async fillAccountDetails(details: any): Promise<void> {
        await this.click(this.titleMrRadio);
        await this.type(this.passwordInput, details.password);
        await this.type(this.firstNameInput, details.firstName);
        await this.type(this.lastNameInput, details.lastName);
        await this.type(this.addressInput, details.address);
        await this.selectOption(this.countrySelect, details.country);
        await this.type(this.stateInput, details.state);
        await this.type(this.cityInput, details.city);
        await this.type(this.zipcodeInput, details.zipcode);
        await this.type(this.mobileNumberInput, details.mobileNumber);
        await this.click(this.createAccountButton);
    }

    async verifyAccountCreated(): Promise<void> {
        await this.verifyElementVisible(this.accountCreatedHeading);
        await this.verifyElementContainsText(this.accountCreatedHeading, 'Account Created!');
    }
}