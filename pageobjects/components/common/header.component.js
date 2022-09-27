const BaseComponent = require('./base.component.js');

class HeaderComponent extends BaseComponent {
    constructor(){
        super('.devsite-header--inner')  
    }

    get overviewBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/why-google-cloud"][track-name="overview"]')
    }
    get solutionsBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/solutions"][track-name="solutions"]')
    }
    get productsBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/products"][track-name="products"]')
    }
    get pricingBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/pricing"][track-name="pricing"]')
    }
    get resoursesBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/start"]')
    }
    get contactusBtn() {
        return this.rootEl.$('[href="https://cloud.google.com/contact"]')
    }
    get searchBtn() {
        return this.rootEl.$('[placeholder="Search"]')
    } 
    get searchInput() {
        return this.rootEl.$('[aria-label="Search"]')
    }
}

module.exports = HeaderComponent;