require('dotenv').config();
const { test } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const LoginPage = require('../pages/loginPage');
const ProductPage = require('../pages/productPage');
const CheckoutPage = require('../pages/checkoutPage');
const fs = require('fs');
const path = require('path');

// Initialize logging directory
const logsDir = path.dirname(process.env.LOG_FILE_PATH || './test-results/logs.txt');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

test.describe('E2E Automation Tests - Registration, Login, Add to Cart, Checkout', () => {
  let loginPage;
  let productPage;
  let checkoutPage;
  let testData;

  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);

    // Generate random test data
    testData = {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9]/ }),
      phone: faker.phone.number(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      postcode: faker.location.zipCode(),
      product: process.env.TEST_PRODUCT || 'iMac',
      countryIndex: parseInt(process.env.PAYMENT_COUNTRY_INDEX) || 5,
      zoneIndex: parseInt(process.env.PAYMENT_ZONE_INDEX) || 3,
    };

    loginPage.log('='.repeat(80));
    loginPage.log('Test execution started');
    loginPage.log(`Email: ${testData.email}`);
    loginPage.log(`Password: ${testData.password}`);
    loginPage.log('='.repeat(80));

    // Navigate to base URL
    await page.goto(process.env.BASE_URL, { waitUntil: 'networkidle' });
    loginPage.log(`Navigated to: ${process.env.BASE_URL}`);
  });

  test.afterEach(async ({ page }) => {
    loginPage.log('='.repeat(80));
    loginPage.log('Test execution completed');
    loginPage.log('='.repeat(80));
  });

  test('01. Get Base URL', async () => {
    loginPage.log('Test: Get Base URL');
    
    const currentUrl = await loginPage.getCurrentUrl();
    loginPage.log(`Current URL is: ${currentUrl}`);
  });

  test('02. User Registration and Login', async () => {
    loginPage.log('Test: User Registration and Login');

    // Register new user
    await loginPage.registerNewUser(
      'Random',
      'Guy',
      testData.email,
      testData.phone,
      testData.password
    );

    // Logout
    await loginPage.logout();
    loginPage.log('User logged out successfully');

    // Login with new credentials
    await loginPage.login(testData.email, testData.password);
    loginPage.log('User logged in successfully');
  });

  test('03. Add to Cart', async ({ page }) => {
    loginPage.log('Test: Add to Cart');

    // First, register a user
    await loginPage.registerNewUser(
      'Random',
      'Guy',
      testData.email,
      testData.phone,
      testData.password
    );

    // Logout after registration
    await loginPage.logout();

    // Then, login with the new credentials
    await loginPage.login(testData.email, testData.password);

    // Search for product and add to cart
    await productPage.searchAndAddToCart(testData.product);

    // Open cart
    await productPage.openCart();
    loginPage.log(`${testData.product} successfully added to cart`);

    await loginPage.takeScreenshot('add-to-cart');
  });

  test('04. Complete Checkout Process', async ({ page }) => {
    loginPage.log('Test: Complete Checkout Process');

    // First, register a user
    await loginPage.registerNewUser(
      'Random',
      'Guy',
      testData.email,
      testData.phone,
      testData.password
    );

    // Logout after registration
    await loginPage.logout();

    // Then, login with the new credentials
    await loginPage.login(testData.email, testData.password);

    // Search for product and add to cart
    await productPage.searchAndAddToCart(testData.product);

    // Open cart and proceed to checkout
    await productPage.openCart();

    // Complete checkout with payment details
    const paymentDetails = {
      firstName: testData.firstName,
      lastName: testData.lastName,
      address: testData.address,
      city: testData.city,
      postcode: testData.postcode,
      countryIndex: testData.countryIndex,
      zoneIndex: testData.zoneIndex,
    };

    await checkoutPage.completeCheckout(paymentDetails);

    loginPage.log('Order placed successfully');
    await loginPage.takeScreenshot('checkout-complete');
  });

  test('05. Full User Journey - Register, Search, Add to Cart, Checkout', async ({ page }) => {
    loginPage.log('Test: Full User Journey');

    // Step 1: Register new user
    await loginPage.registerNewUser(
      'Random',
      'Guy',
      testData.email,
      testData.phone,
      testData.password
    );

    // Step 2: Logout
    await loginPage.logout();

    // Step 3: Login with new credentials
    await loginPage.login(testData.email, testData.password);

    // Step 4: Search and add to cart
    await productPage.searchAndAddToCart(testData.product);

    // Step 5: View cart and checkout
    await productPage.openCart();

    // Step 6: Complete payment and delivery details
    const paymentDetails = {
      firstName: testData.firstName,
      lastName: testData.lastName,
      address: testData.address,
      city: testData.city,
      postcode: testData.postcode,
      countryIndex: testData.countryIndex,
      zoneIndex: testData.zoneIndex,
    };

    await checkoutPage.completeCheckout(paymentDetails);

    loginPage.log('Full user journey completed successfully');
    await loginPage.takeScreenshot('full-journey-complete');
  });
});
