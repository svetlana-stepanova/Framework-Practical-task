const BasePage = require("../pageobjects/pages/base.page");

class YopmailPage extends BasePage {
    constructor() {
        super('https://yopmail.com/en/email-generator')
    }

    get copyToClipboardButton () {
        return $('//button[@id="cprnd"]/span/span[1]')
    }

    get checkInboxButton () {
        return $('//*[@class="nw"]/button[2]//span')
    }

    get iframe () {
        return $('//*[@id="ifmail"]')
    }

    async switchFrame() {
        await browser.pause(2000)
        await browser.switchToFrame(await this.iframe)
    }

    get mailHeader () {
        return $('//header/div[3]/div[1]')
    }

    get totalEstimatedMonthlyCost () {
        return $$('//div[@id="mail"]//h3') [1]
    }
}

module.exports = YopmailPage;