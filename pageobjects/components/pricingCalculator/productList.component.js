const BaseComponent = require('../common/base.component.js');

class ProductListComponent extends BaseComponent {
    constructor() {
        super('//*[@id="mainForm"]/md-tabs/md-tabs-wrapper/md-tabs-canvas/md-pagination-wrapper') 
    }                                                                                          

    /*
    * @param : {computeEngine | gkeStandard | gkeAutopilot }
    */

    setProduct(name) {
        const items = {
            computeEngine: '//md-tab-item[1]/div/div',
            gkeStandard: '//md-tab-item[2]/div/div',
            gkeAutopilot: '//md-tab-item[2]/div/div'
        }
    return this.rootEl.$(items[name])
    }
}

module.exports = ProductListComponent;