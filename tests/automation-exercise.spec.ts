import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { AuthPage } from '../pages/auth.page';
import { SignupPage } from '../pages/signup.page';
import { ProductsPage } from '../pages/products.page';
import { CategoryPage } from '../pages/category.page';
import { DataGenerator } from '../utils/data-generator';
import { testData, userProfile } from '../playwright.config';

test.describe('Automation Exercise E2E', () => {
    let homePage: HomePage;
    let authPage: AuthPage;
    let signupPage: SignupPage;
    let productsPage: ProductsPage;
    let categoryPage: CategoryPage;

    test.beforeEach(async ({ page }) => {
        // Intercept and block common ad/tracking domains to reduce test flakiness
        await page.route('**/*google*/**', route => route.abort());
        await page.route('**/*doubleclick*/**', route => route.abort());
        await page.route('**/pagead/**', route => route.abort());

        // Initialize Page Objects (Note: Ensure all locators inside these classes are marked 'private')
        homePage = new HomePage(page);
        authPage = new AuthPage(page);
        signupPage = new SignupPage(page);
        productsPage = new ProductsPage(page);
        categoryPage = new CategoryPage(page);
    });

    test('Product Search and Category Filtering',{ tag: ['@regression', '@catalog'] }, 
        async () => {
            // Generate unique test data for registration
            const uniqueEmail = DataGenerator.generateUniqueEmail();
            const mockUser = DataGenerator.getStaticMockUser(uniqueEmail, userProfile);

            // 1. & 2. Navigation
            await test.step('Navigate to Application Base URL and Validate Homepage Initial State', async () => {
                // Uses the environment-specific baseURL configured inside playwright.config.ts natively
                await homePage.navigateTo('/');
                await homePage.verifyHomePageLoaded();
            });

            // 3., 4., 5. & 6. Registration Flow
            await test.step('Initialize and Execute Account Registration Flow', async () => {
                await homePage.goToSignupLogin();
                await authPage.initiateSignup(mockUser.username, mockUser.email);
                await signupPage.fillAccountDetails(mockUser);
                await signupPage.verifyAccountCreated();
            });

            // 7. Session Validation
            await test.step('Verify User Auth Session Tracking on Redirect Routing', async () => {
                await homePage.navigateTo('/');
                await homePage.verifyLoggedInUser(mockUser.username);
            });

            // 8. & 9. Positive Search Flow
            await test.step('Perform Valid Product Inventory Lookup via Environment Catalog Data', async () => {
                await homePage.goToProducts();
                // Pulls data parameters seamlessly from the selected runtime profile mapping
                await productsPage.searchProduct(testData.jeansSearch.searchTerm);
                await productsPage.verifyAllProductNamesContain(testData.jeansSearch.expectedValidationText);
            });

            // 10. Negative Search Flow
            await test.step('Verify Graceful Failures For Non-Existent Search Catalogs', async () => {
                await productsPage.searchProduct(testData.invalidSearch.searchTerm);
                await productsPage.verifyNoProductsFound();
            });

            // 11., 12. & 13. Category Filtering
            await test.step('Navigate Dynamic Category Collections and Validate Listed Inventories', async () => {
                await homePage.selectWomenDressCategory();
                await categoryPage.verifyCategoryHeader(testData.categories.womenDress.headerText);
                await categoryPage.verifyProductsAreListed();
            });

            // 14. & 15. Brand Filtering
            await test.step('Navigate Distinct Brand Nodes and Assert Structural Entities', async () => {
                await homePage.selectPoloBrand();
                await categoryPage.verifyCategoryHeader(testData.brands.polo.headerText);
                await categoryPage.verifyProductsAreListed();
            });
        }
    );
});