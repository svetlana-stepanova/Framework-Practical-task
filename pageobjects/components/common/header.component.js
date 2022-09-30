const BaseComponent = require('./base.component.js');

class HeaderComponent extends BaseComponent {
    constructor(){
        super('.devsite-header--inner')  
    }

    get searchBtn() {
        return this.rootEl.$('[placeholder="Search"]')
    } 
    get searchInput() {
        return this.rootEl.$('[aria-label="Search"]')
    }
}

module.exports = HeaderComponent;