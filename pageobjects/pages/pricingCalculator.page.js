const EmailYourEstimateForm = require('../components/pricingCalculator/emailYourEstimateForm.component.js')
const EstimateResultBlock = require('../components/pricingCalculator/estimateResultBlock.component.js');
const ProductListComponent = require('../components/pricingCalculator/productList.component.js');
const BasePage = require('./base.page.js');

class PricingCalculator extends BasePage {
    constructor() {
        super('/products/calculator');
        this.productList = new ProductListComponent();
        this.estimateResultBlock = new EstimateResultBlock();
        this.emailYourEstimateForm = new EmailYourEstimateForm();
        
    }
    open() {
        super.open(this.url)
    }

    get outerFrame() {
        return $('devsite-iframe>iframe')
    } 

    get innerFrame() {
        return $('#myFrame')
    }

   async switchFrame() {
        await browser.pause(2000)
        await browser.switchToFrame(await this.outerFrame)
        await browser.switchToFrame(await this.innerFrame)
    }
         
    get instancesField() {
        return $('//md-input-container/input[@ng-model="listingCtrl.computeServer.quantity"]')
    }

    get operatingSystem () {
        return $('//md-select[@ng-model="listingCtrl.computeServer.os"]')
    }

    setOperatingSystem(name) {
        const item = {
            free: '//div[contains(text(),"Free: Debian, CentOS, CoreOS, Ubuntu or BYOL")]'
        }
        return $$(item[name])[1]
    }
    get provisioningModel() {
        return $('//md-select[@placeholder="VM Class"]')
    }

    setProvisioningModel(name) {
        const item = {
            regular: '//div[contains(text(),"Regular")]'
        }
        return $$(item[name])[1]
    }

    get series() {
        return $('//md-select[@placeholder="Series"]')
    }

    /*
    * @ param {n1 | n2 | n2d}
    */

    setSeries(name) {
        const items = {
            n1: '//div[contains(text(),"N1")]',
            n2: '//div[contains(text(),"N2")]',
            n2d: '//div[contains(text(),"N2D")]'
        }
        return $$(items[name])[0]
    }

    get machineType() {
        return $('//md-select[@placeholder="Instance type"] ') 
    }

    /*
    * @param { n1standard8 }
    */

    setMachineType(name) {
        const items = {
            n1standard8: '//div[contains(text(),"n1-standard-8")]'

        }
        return $$(items[name])[0]
    }

    get addCPUsCheckbox() {  
        return $$('//md-checkbox[@aria-label="Add GPUs"]')[0]
   }

    get gpuType() {
        return $('//*[@placeholder="GPU type"]')
    }

    setGPUType(name) {
        const item = {
            nVidiaTeslaV100: '//div[contains(text(),"NVIDIA Tesla V100")]'
        }
        return $$(item[name])[0]
    }

    get numberOfGPUs() {
        return $('//*[@placeholder="Number of GPUs"]')
    }

    setNumberOfGPUs(number) {
        const items = {
            1: '//div[@class="md-select-menu-container md-active md-clickable"]//md-option[2]/div'
        }
        return $(items[number])
    }

    get localSSD() {
        return $$('//*[@placeholder="Local SSD"]')[0]
    }

    setLocalSSD(name){
        const items = {
            '2x375': '//div[contains(text(),"2x375")]'  
        }
        return $(items[name])
    }

    get datacenterLocation() {
        return $$('//md-select[@placeholder="Datacenter location"]')[0]
    }

    setDatacenterLocation(name) {
        const items = {
            frankfurt: '//md-option[@value="europe-west3"]/div'
        }
        return $$(items[name])[2]
    }

    get commitedUsage() {
        return $$('//md-select[@placeholder="Committed usage"]')[0]
    }

    setCommitedUsage(term) {
        const items = {
           '1 Year': '//div[contains(text(),"1 Year")]'
        }
        return $$(items[term])[1]
    }
    
    get addToEstimateBtn() {
        return $$('//button[@aria-label="Add to Estimate"]')[0]
    }
}

module.exports = PricingCalculator;