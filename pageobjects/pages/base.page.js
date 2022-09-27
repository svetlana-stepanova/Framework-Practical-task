const HeaderComponent = require('../components/common/header.component.js');

class BasePage {
    constructor(url) {
        this.url = url;
        this.header = new HeaderComponent()
    }

    open(path) {
       return browser.url(path);
        
    }
} 

module.exports = BasePage;