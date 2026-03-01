const BasePage = require('./basePage');

class ProductPage extends BasePage {
  // Locators
  get searchInput() {
    return 'input[placeholder="Search"]';
  }

  get searchButton() {
    return 'button.btn.btn-default.btn-lg';
  }

  get firstProductTitle() {
    return 'div.caption h4 a';
  }

  get addToCartButton() {
    return '#button-cart';
  }

  get cartDropdown() {
    return '.btn.btn-inverse.btn-block.btn-lg.dropdown-toggle';
  }

  get viewCartLink() {
    return 'body > header:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > div:nth-child(1) > p:nth-child(2) > a:nth-child(1) > strong:nth-child(1)';
  }

  /**
   * Search for a product
   */
  async searchForProduct(productName) {
    this.log(`Searching for product: ${productName}`);
    
    await this.fill(this.searchInput, productName);
    this.log(`Entered search term: ${productName}`);
    
    await this.click(this.searchButton);
    this.log('Clicked search button');
    
    this.log(`Search completed for: ${productName}`);
  }

  /**
   * Click on first product in search results
   */
  async clickFirstProduct() {
    this.log('Clicking on first product in search results');
    
    await this.click(this.firstProductTitle);
    this.log('Clicked first product');
  }

  /**
   * Add product to cart
   */
  async addProductToCart() {
    this.log('Adding product to cart');
    
    await this.click(this.addToCartButton);
    this.log('Clicked add to cart button');
    
    await this.sleep(500);
    this.log('Product added to cart');
  }

  /**
   * Open cart from dropdown
   */
  async openCart() {
    this.log('Opening shopping cart');
    
    await this.click(this.cartDropdown);
    this.log('Clicked cart dropdown');
    
    await this.click(this.viewCartLink);
    this.log('Clicked view cart link');
    
    this.log('Cart opened');
  }

  /**
   * Search, select and add product to cart
   */
  async searchAndAddToCart(productName) {
    this.log(`Searching for and adding ${productName} to cart`);
    
    await this.searchForProduct(productName);
    await this.clickFirstProduct();
    await this.addProductToCart();
    
    this.log(`${productName} added to cart`);
  }
}

module.exports = ProductPage;
