const BasePage = require('./basePage');

class CheckoutPage extends BasePage {
  // Locators
  get checkoutButton() {
    return 'a.btn.btn-primary';
  }

  get paymentFirstNameInput() {
    return '#input-payment-firstname';
  }

  get paymentLastNameInput() {
    return '#input-payment-lastname';
  }

  get paymentAddressInput() {
    return '#input-payment-address-1';
  }

  get paymentCityInput() {
    return '#input-payment-city';
  }

  get paymentPostcodeInput() {
    return '#input-payment-postcode';
  }

  get paymentCountryDropdown() {
    return '#input-payment-country';
  }

  get paymentZoneDropdown() {
    return '#input-payment-zone';
  }

  get paymentAddressButton() {
    return '#button-payment-address';
  }

  get shippingAddressButton() {
    return '#button-shipping-address';
  }

  get shippingMethodButton() {
    return '#button-shipping-method';
  }

  get shippingMethodRadio() {
    return 'input[value="1"]';
  }

  get paymentMethodButton() {
    return '#button-payment-method';
  }

  get confirmOrderButton() {
    return '#button-confirm';
  }

  /**
   * Fill payment details
   */
  async fillPaymentDetails(firstName, lastName, address, city, postcode, countryIndex, zoneIndex) {
    this.log('Filling payment details');
    
    // Wait for all payment fields to be clickable before filling (10000ms timeout for payment form which can take time to load)
    await this.waitForElementToBeClickable(this.paymentFirstNameInput, 10000);
    await this.fill(this.paymentFirstNameInput, firstName);
    
    await this.waitForElementToBeClickable(this.paymentLastNameInput, 5000);
    await this.fill(this.paymentLastNameInput, lastName);
    
    await this.waitForElementToBeClickable(this.paymentAddressInput, 5000);
    await this.fill(this.paymentAddressInput, address);
    
    await this.waitForElementToBeClickable(this.paymentCityInput, 5000);
    await this.fill(this.paymentCityInput, city);
    
    await this.waitForElementToBeClickable(this.paymentPostcodeInput, 5000);
    await this.fill(this.paymentPostcodeInput, postcode);
    
    // Select country from dropdown
    this.log(`Selecting country at index: ${countryIndex}`);
    await this.waitForElementToBeClickable(this.paymentCountryDropdown, 5000);
    await this.selectByIndex(this.paymentCountryDropdown, countryIndex);
    
    this.log(`Selecting zone at index: ${zoneIndex}`);
    await this.waitForElementToBeClickable(this.paymentZoneDropdown, 5000);
    await this.selectByIndex(this.paymentZoneDropdown, zoneIndex);
    
    this.log('Payment details filled');
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    this.log('Proceeding to checkout');
    
    await this.waitForElementToBeClickable(this.checkoutButton, 5000);
    await this.click(this.checkoutButton);
    this.log('Clicked checkout button');
    
    // Wait for page to load/navigate after checkout click
    await this.sleep(1000);
    this.log('Waiting for checkout page to load');
  }

  /**
   * Confirm payment address
   */
  async confirmPaymentAddress() {
    this.log('Confirming payment address');
    
    await this.waitForElementToBeClickable(this.paymentAddressButton, 5000);
    await this.click(this.paymentAddressButton);
    this.log('Clicked payment address button');
  }

  /**
   * Confirm shipping address
   */
  async confirmShippingAddress() {
    this.log('Confirming shipping address');
    
    await this.waitForElementToBeClickable(this.shippingAddressButton, 5000);
    await this.click(this.shippingAddressButton);
    this.log('Clicked shipping address button');
  }

  /**
   * Select shipping method
   */
  async selectShippingMethod() {
    this.log('Selecting shipping method');
    
    await this.waitForElementToBeClickable(this.shippingMethodButton, 5000);
    await this.click(this.shippingMethodButton);
    this.log('Clicked shipping method button');
    
    await this.waitForElementToBeClickable(this.shippingMethodRadio, 5000);
    await this.click(this.shippingMethodRadio);
    this.log('Selected shipping method');
  }

  /**
   * Confirm payment method
   */
  async confirmPaymentMethod() {
    this.log('Confirming payment method');
    
    await this.waitForElementToBeClickable(this.paymentMethodButton, 5000);
    await this.click(this.paymentMethodButton);
    this.log('Clicked payment method button');
  }

  /**
   * Confirm order
   */
  async confirmOrder() {
    this.log('Confirming order');
    
    await this.waitForElementToBeClickable(this.confirmOrderButton, 5000);
    await this.click(this.confirmOrderButton);
    this.log('Clicked confirm order button');
    
    await this.sleep(3000);
    
    this.log('Order confirmed');
  }

  /**
   * Complete full checkout process
   */
  async completeCheckout(paymentDetails) {
    this.log('Starting complete checkout process');
    
    await this.proceedToCheckout();
    await this.fillPaymentDetails(
      paymentDetails.firstName,
      paymentDetails.lastName,
      paymentDetails.address,
      paymentDetails.city,
      paymentDetails.postcode,
      paymentDetails.countryIndex,
      paymentDetails.zoneIndex
    );
    await this.confirmPaymentAddress();
    await this.confirmShippingAddress();
    await this.selectShippingMethod();
    await this.confirmPaymentMethod();
    await this.confirmOrder();
    
    this.log('Checkout process completed successfully');
  }
}

module.exports = CheckoutPage;
