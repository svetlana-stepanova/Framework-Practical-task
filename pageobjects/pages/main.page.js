const BasePage = require('./base.page.js');

class MainPage extends BasePage {
    constructor() {
        super('/')
    }
    open() {
        super.open(this.url)
    }
}

module.exports = MainPage;