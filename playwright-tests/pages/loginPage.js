const BasePage = require('./basePage');

class LoginPage extends BasePage {
  // Locators
  get headerProfileDropdown() {
    return '.caret';
  }

  get registerLink() {
    return 'a:has-text("Register")';
  }

  get loginLink() {
    return 'a:has-text("Login")';
  }

  get firstNameInput() {
    return '#input-firstname';
  }

  get lastNameInput() {
    return '#input-lastname';
  }

  get emailInput() {
    return '#input-email';
  }

  get telephoneInput() {
    return '#input-telephone';
  }

  get passwordInput() {
    return '#input-password';
  }

  get confirmPasswordInput() {
    return '#input-confirm';
  }

  get termsCheckbox() {
    return 'input[name="agree"]';
  }

  get continueButton() {
    return '//input[@value="Continue"]';
  }

  get continueLink() {
    return 'a:has-text("Continue")';
  }

  get logoutLink() {
    return 'a:has-text("Logout")';
  }

  get userMenuDropdown() {
    return '//div[@id="top-links"]/ul/li[2]/a/span';
  }

  get loginCSS() {
    return 'input[value="Login"]';
  }

  /**
   * Register a new user
   */
  async registerNewUser(firstName, lastName, email, phone, password) {
    this.log(`Starting registration process for ${email}`);
    
    // Click on profile dropdown and select Register
    await this.click(this.headerProfileDropdown);
    this.log('Clicked profile dropdown');
    
    await this.click(this.registerLink);
    this.log('Clicked register link');
    
    // Fill registration form
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.telephoneInput, phone);
    await this.fill(this.passwordInput, password);
    await this.fill(this.confirmPasswordInput, password);
    
    // Accept terms and continue
    await this.click(this.termsCheckbox);
    this.log('Accepted terms and conditions');
    
    await this.click(this.continueButton);
    this.log('Clicked continue button on registration form');
    
    await this.sleep(500);
    
    // Click continue link on success page
    await this.click(this.continueLink);
    this.log('Clicked continue link on registration success page');
    
    this.log(`Registration completed for ${email}`);
  }

  /**
   * Logout from account
   */
  async logout() {
    this.log('Starting logout process');
    
    await this.click(this.userMenuDropdown);
    this.log('Clicked user menu dropdown');
    
    await this.click(this.logoutLink);
    this.log('Clicked logout link');
    
    this.log('Logout completed');
  }

  /**
   * Login with existing credentials
   */
  async login(email, password) {
    this.log(`Starting login process for ${email}`);
    
    await this.sleep(1000);
    
    // Click on profile dropdown and select Login
    await this.click(this.headerProfileDropdown);
    this.log('Clicked profile dropdown');
    
    await this.click(this.loginLink);
    this.log('Clicked login link');
    
    // Fill login form
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    
    await this.sleep(200);
    
    // Click login button
    await this.click(this.loginCSS);
    this.log('Clicked login button');
    
    this.log(`Login completed for ${email}`);
  }
}

module.exports = LoginPage;
