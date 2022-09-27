const BasePage = require("../pageobjects/pages/base.page");

class YopmailPage extends BasePage {
    constructor() {
        super('https://yopmail.com/en/email-generator')
    }

    get copyToClipboardButton () {
        return $('//button[@id="cprnd"]/span/span[1]')
    }

    get checkInboxButton () {
        return $$('//*[@class="md but text f24 egenbut"]/span')[2]
    }

    get iframe () {
        return $('//*[@id="ifmail"]')
    }

    async switchFrame() {
        await browser.pause(2000)
        await browser.switchToFrame(await this.iframe)
    }

    get mailHeader () {
        return $('//*[@style="margin:10px 5px 0px 8px;"]')
    }

    get totalEstimatedMonthlyCost () {
        return $('//tr[@style="padding: 0 0 24px 24px"]/td/table/tbody/tr[2]/td[2]/h3')
    }
}

module.exports = YopmailPage;