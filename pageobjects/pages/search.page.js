const BasePage = require('./base.page.js');

class SearchPage extends BasePage {
    constructor() {
        super('s/results?q=Google%20Cloud%20Platform%20Pricing%20Calculator')
    }
    get firstLinkOfSearchResult(){
        return $('//div[@class="gsc-expansionArea"]/div[1]/div[1]/div[1]/div[1]/a/b')
    }
}

module.exports = SearchPage;
