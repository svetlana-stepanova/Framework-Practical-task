const YopmailPage = require('../../utilities/yopmail.page.js');
const MainPage = require('./main.page.js');
const PricingCalculator = require('./pricingCalculator.page.js');
const SearchPage = require('./search.page.js');

function page (name) {
    const items = {
        main: new MainPage(),
        searchPage: new SearchPage,
        pricingCalculator: new PricingCalculator(),
        yopmailPage: new YopmailPage
    }
    return items[name]
}

module.exports = {
    MainPage,
    SearchPage,
    PricingCalculator,
    YopmailPage,
    page
}