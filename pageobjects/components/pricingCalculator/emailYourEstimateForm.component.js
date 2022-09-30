const BaseComponent = require('../common/base.component');

class EmailYourEstimateForm extends BaseComponent {
    constructor() {
        super('//form[@name="emailForm"]/md-content')
    }

    get emailField() {

        return $('//form[@name="emailForm"]/md-content/div[3]//input')
    }

    get sendEmailBtn() {
        return $('//button[@aria-label="Send Email"]')
    }
}

module.exports = EmailYourEstimateForm;