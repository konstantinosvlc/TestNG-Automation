require('dotenv').config();
const fs = require('fs');
const path = require('path');

class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = parseInt(process.env.WAIT_TIMEOUT) || 5000;
    this.navigationTimeout = parseInt(process.env.NAVIGATION_TIMEOUT) || 30000;
    this.screenshotOnFailure = process.env.SCREENSHOT_ON_FAILURE === 'true';
    this.logToFile = process.env.LOG_TO_FILE === 'true';
    this.logFilePath = process.env.LOG_FILE_PATH || './test-results/logs.txt';
    
    // Ensure logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  /**
   * Log messages to console and optionally to file
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    console.log(logMessage);
    
    if (this.logToFile) {
      fs.appendFileSync(this.logFilePath, logMessage + '\n');
    }
  }

  /**
   * Navigate to a URL
   */
  async navigateTo(url) {
    this.log(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Find element by any locator and perform action
   */
  async findElement(selector) {
    this.log(`Finding element: ${selector}`);
    return await this.page.locator(selector);
  }

  /**
   * Click an element
   */
  async click(selector) {
    this.log(`Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Fill text input
   */
  async fill(selector, text) {
    this.log(`Filling element ${selector} with text: ${text.substring(0, 20)}...`);
    await this.page.fill(selector, text);
  }

  /**
   * Get text from element
   */
  async getText(selector) {
    const text = await this.page.innerText(selector);
    this.log(`Retrieved text from ${selector}: ${text}`);
    return text;
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = this.timeout) {
    this.log(`Waiting for element: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for element to be clickable (visible and enabled)
   */
  async waitForElementToBeClickable(selector, timeout = 2000) {
    this.log(`Waiting for element to be clickable: ${selector} (timeout: ${timeout}ms)`);
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name) {
    const screenshotPath = `./test-results/screenshots/${name}-${Date.now()}.png`;
    const dir = path.dirname(screenshotPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await this.page.screenshot({ path: screenshotPath });
    this.log(`Screenshot saved: ${screenshotPath}`);
  }

  /**
   * Wait for multiple elements
   */
  async sleep(ms) {
    this.log(`Sleeping for ${ms}ms`);
    await this.page.waitForTimeout(ms);
  }

  /**
   * Select option from dropdown
   */
  async selectByIndex(selector, index) {
    this.log(`Selecting option at index ${index} from: ${selector}`);
    await this.page.selectOption(selector, { index });
  }

  /**
   * Get page URL
   */
  async getCurrentUrl() {
    const url = this.page.url();
    this.log(`Current URL: ${url}`);
    return url;
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector) {
    try {
      const isVisible = await this.page.isVisible(selector);
      this.log(`Element ${selector} visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      this.log(`Error checking visibility of ${selector}: ${error.message}`, 'error');
      return false;
    }
  }
}

module.exports = BasePage;
