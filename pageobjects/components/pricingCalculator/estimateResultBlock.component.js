const BaseComponent = require('../common/base.component');

class EstimateResultBlock extends BaseComponent {
    constructor(){
        super('#resultBlock')
    }

    get regionField() {
        return $('//div[contains(text(),"Region")]')
    }

    get provisioningModelField() {
        return $('//div[contains(text(),"Provisioning model")]')
    }

    get commitmentTermField() {
        return $('//div[contains(text(),"Commitment term")]')
    }

    get instanceTypeField() {
        return $('//div[contains(text(),"Instance type")]')
    }

    get localSSDField() {
        return $('//div[contains(text(),"Local SSD:")]')
    }

    get totalEstimatedCostField() {
        return $('//b[contains(text(),"Total Estimated Cost")]')
    }

    get emailBtn() {
        return $('//button[@title="Email Estimate"]')
    }
}

module.exports = EstimateResultBlock;