# Playwright Automation Tests - Page Object Model (POM)

This project migrates the Java/Selenium/TestNG test automation suite to JavaScript/Playwright with Page Object Model pattern.

## Project Structure

```
playwright-tests/
├── pages/                    # Page Object Model classes
│   ├── basePage.js          # Base class with common functionality
│   ├── loginPage.js         # Registration & Login page object
│   ├── productPage.js       # Product search & cart operations
│   └── checkoutPage.js      # Checkout process page object
├── tests/
│   └── e2e.spec.js          # E2E test specifications
├── .env                     # Environment variables & configuration
├── playwright.config.js     # Playwright test configuration
├── package.json             # Project dependencies
└── README.md               # This file
```

## Features

✅ **Page Object Model (POM)** - Maintainable, scalable test structure  
✅ **Centralized Logging** - Console and file-based logging via dotenv  
✅ **Test Data Generation** - Uses @faker-js for realistic test data  
✅ **Comprehensive Error Handling** - Screenshots on failure, video recording  
✅ **Multiple Test Scenarios** - Registration, login, shopping cart, checkout  
✅ **HTML & JSON Reporting** - Detailed test reports  

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   cd playwright-tests
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Configuration

The `.env` file contains all configuration settings:

```env
# Application URLs
BASE_URL=https://awesomeqa.com/ui/
GOOGLE_URL=https://www.google.com

# Browser Configuration
HEADLESS=true          # Run in headless mode
BROWSER=chromium       # Browser type
SLOW_MO=0             # Slow down execution (ms)

# Test Timeouts
TIMEOUT=30000         # Default timeout in ms
NAVIGATION_TIMEOUT=30000
WAIT_TIMEOUT=5000

# Logging Configuration
LOG_LEVEL=info
SCREENSHOT_ON_FAILURE=true
LOG_TO_FILE=true
LOG_FILE_PATH=./test-results/logs.txt

# Test Data
TEST_PRODUCT=iMac
PAYMENT_COUNTRY_INDEX=5
PAYMENT_ZONE_INDEX=3
SHIPPING_METHOD_VALUE=1
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run in UI mode (watch mode)
```bash
npm run test:ui
```

### Run in headed mode (browser visible)
```bash
npm run test:headed
```

### Run in debug mode
```bash
npm run test:debug
```

### Generate HTML report
```bash
npm run test:report
```

## Test Files Overview

### `basePage.js`
Base class providing:
- Navigation methods
- Element interaction utilities (click, fill, getText, etc.)
- Wait methods with configurable timeouts
- Logging to console and file
- Screenshot capabilities
- Select dropdown functionality

**Key Methods:**
- `navigateTo(url)` - Navigate to a URL
- `click(selector)` - Click an element
- `fill(selector, text)` - Fill text input
- `getText(selector)` - Get element text
- `waitForElement(selector)` - Wait for element visibility
- `takeScreenshot(name)` - Capture screenshot
- `selectByIndex(selector, index)` - Select dropdown option
- `log(message, level)` - Log with timestamp

### `loginPage.js`
Handles registration and authentication:
- **registerNewUser()** - Complete registration flow
- **logout()** - Logout from account
- **login()** - Login with credentials

### `productPage.js`
Manages product search and cart operations:
- **searchForProduct()** - Search by product name
- **clickFirstProduct()** - Select first search result
- **addProductToCart()** - Add item to cart
- **openCart()** - Open shopping cart
- **searchAndAddToCart()** - Combined search and add operation

### `checkoutPage.js`
Handles the complete checkout process:
- **fillPaymentDetails()** - Enter payment information
- **proceedToCheckout()** - Start checkout
- **confirmPaymentAddress()** - Confirm billing address
- **confirmShippingAddress()** - Confirm shipping address
- **selectShippingMethod()** - Choose shipping option
- **confirmPaymentMethod()** - Confirm payment method
- **confirmOrder()** - Final order confirmation
- **completeCheckout()** - Execute full checkout flow

## Test Scenarios

### Test 1: Get Base URL
Verifies navigation to the base URL

### Test 2: User Registration and Login
- Registers a new user with random data
- Logs out
- Logs back in with the new credentials

### Test 3: Add to Cart
- Logs in with existing credentials
- Searches for a product
- Adds product to cart
- Opens cart view

### Test 4: Complete Checkout Process
- Logs in
- Searches for product
- Adds to cart
- Completes full checkout with random delivery details

### Test 5: Full User Journey
Complete end-to-end test covering:
- Registration
- Login
- Product search
- Add to cart
- Checkout with payment details

## Logging

All actions are logged with timestamps. Logs are saved to:
- **Console:** Real-time display of test execution
- **File:** `./test-results/logs.txt` (configured in .env)

Log format: `[YYYY-MM-DDTHH:mm:ss.sssZ] [LEVEL] message`

## Test Reports

After running tests, reports are generated in:
- **HTML Report:** `test-results/html/index.html`
- **JSON Report:** `test-results/test-results.json`
- **JUnit Report:** `test-results/junit-results.xml`
- **Logs:** `test-results/logs.txt`
- **Screenshots:** `test-results/screenshots/`
- **Videos:** `test-results/videos/`

## Environment Variables

You can override env variables at runtime:

```bash
BASE_URL=https://example.com npm test
HEADLESS=false npm run test:headed
```

## Troubleshooting

### Tests timing out
Increase `TIMEOUT` or `WAIT_TIMEOUT` in `.env`

### Elements not found
1. Check selectors in page objects
2. Increase `WAIT_TIMEOUT`
3. Review console logs in `test-results/logs.txt`

### Screenshots/Videos not saving
Ensure `test-results/` directory exists and has write permissions

## Best Practices

1. **Maintain Selectors Separately** - All locators defined at top of page objects
2. **Use Descriptive Log Messages** - Trace execution flow easily
3. **Reuse Common Methods** - BasePage contains shared functionality
4. **Test Data Generation** - Use Faker for realistic data
5. **Error Recovery** - Screenshots on failure for debugging
6. **Explicit Waits** - Use waitForElement() instead of hardcoded sleeps

## Migration from Java/Selenium

### Key Changes
- **Language:** Java → JavaScript
- **Framework:** Selenium → Playwright
- **Test Runner:** TestNG → Playwright Test
- **Configuration:** Annotations → Config file
- **Locators:** Xpath/CSS → Playwright locators
- **Logger:** Custom → dotenv + console logging
- **Data Generation:** JavaFaker → @faker-js

## Dependencies

- **@playwright/test** - Testing framework
- **@faker-js/faker** - Random data generation
- **dotenv** - Environment variable management

## License

ISC

## Support

For issues or questions, refer to:
- [Playwright Docs](https://playwright.dev/)
- [Faker.js Docs](https://fakerjs.dev/)
