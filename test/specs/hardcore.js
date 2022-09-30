const { page } = require('../../pageobjects/pages/index.js');
const { waitAndClick } = require('../../utilities/helper.js');

describe('Hardcore', () => {

    it('Search page should be opened', async () => {
        //1. Open https://cloud.google.com/
        await page('main').open()
        // 2. By clicking the search button on the portal at the top of the page, enter in the search field
        // "Google Cloud Platform Pricing Calculator"
        await page('main').header.searchBtn.click()
        // 3. Start the search by clicking the search button.(changed)
        await page('main').header.searchInput.setValue('Google Cloud Pricing Calculator')
        await browser.keys(['Enter'])
        await expect(page('main').header.searchInput).toHaveValue('Google Cloud Pricing Calculator')
        await expect(browser).toHaveTitleContaining('Search results for')                           
                
    });

    it('Search target should be found and opened', async () => {
        // 4. In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.
        await expect(page('searchPage').firstLinkOfSearchResult).toHaveTextContaining('Google Cloud Pricing Calculator')
        await page('searchPage').firstLinkOfSearchResult.click()
        await expect(browser).toHaveTitle('Google Cloud Pricing Calculator')
    });

    it('Pricing calculator should do estimate with correct data and show estimate result block',  async () => {    
        await page('pricingCalculator').open()  
        await page('pricingCalculator').switchFrame()
        //5. Activate the COMPUTE ENGINE section at the top of the page
        await page('pricingCalculator').productList.setProduct('computeEngine').click() 
        // 6. Fill in the form with the following data:
           //* Number of instances: 4
        await page('pricingCalculator').instancesField.click()
        await page('pricingCalculator').instancesField.setValue('4')
           //* What are these instances for ?: leave blank
           // * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
        await page('pricingCalculator').operatingSystem.click()
        await waitAndClick(page('pricingCalculator').setOperatingSystem('free'), 3000)
          // * VM Class: Regular
        await page('pricingCalculator').provisioningModel.click()
        await waitAndClick(page('pricingCalculator').setProvisioningModel('regular'), 3000)
          //* Series: N1
        await page('pricingCalculator').series.click()
        await waitAndClick(page('pricingCalculator').setSeries('n1'), 3000) 
          //* Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
        await page('pricingCalculator').machineType.click()
        await waitAndClick(page('pricingCalculator').setMachineType('n1standard8'), 3000)
          //* Select Add GPUs   
        await page('pricingCalculator').addCPUsCheckbox.click()
          //* GPU type: NVIDIA Tesla V100                              
        await page('pricingCalculator').gpuType.click()
        await waitAndClick(page('pricingCalculator').setGPUType('nVidiaTeslaV100'), 3000)
          //* Number of GPUs: 1  
        await page('pricingCalculator').numberOfGPUs.click()
        await waitAndClick(page('pricingCalculator').setNumberOfGPUs(1), 3000)
          //* Local SSD: 2x375 Gb
        await page('pricingCalculator').localSSD.click()   
        await waitAndClick(page('pricingCalculator').setLocalSSD('2x375'), 3000)                 
          //* Datacenter location: Frankfurt (europe-west3)
        await page('pricingCalculator').datacenterLocation.click()
        await waitAndClick(page('pricingCalculator').setDatacenterLocation('frankfurt'), 3000)
          // * Commited usage: 1 Year
        await page('pricingCalculator').commitedUsage.click()
        await waitAndClick(page('pricingCalculator').setCommitedUsage('1 Year'), 3000)
        //7. Click Add to Estimate
        await page('pricingCalculator').addToEstimateBtn.click()
        await expect(page('pricingCalculator').estimateResultBlock.rootEl).toBeDisplayed()
    });

    it('Email button on the Estimate result block should be displayed and clickable', async () => {
        await expect(page('pricingCalculator').estimateResultBlock.emailBtn).toBeDisplayed()
        await expect(page('pricingCalculator').estimateResultBlock.emailBtn).toBeClickable()
    });

        //9. In a new tab, open https://10minutemail.com or a similar service for generating temporary emails
    it('Should open a new tab with the service for generating temporary email address and get email address', async () => {
        await browser.newWindow(page('yopmailPage').url)                    
        await expect(browser).toHaveTitleContaining('YOPmail - email address generator')
        //10. Copy the mailing address generated in 10minutemail      
        await waitAndClick(page('yopmailPage').copyToClipboardButton, 3000)
    });

    it('Return to the Pricing calculator page and enter the email address in the Email field', async () => {
        //11. Return to the calculator, in the Email field enter the address from the previous paragraph
        await browser.switchWindow(page('pricingCalculator').url)
        await page('pricingCalculator').switchFrame()
        await waitAndClick(page('pricingCalculator').estimateResultBlock.emailBtn, 3000)
        await browser.pause(1000)
        await page('pricingCalculator').emailYourEstimateForm.emailField.click() 
        await browser.keys(['Control', 'v'])
        await expect(page('pricingCalculator').emailYourEstimateForm.sendEmailBtn).toBeClickable()
    });

    it('Send an email and check if it has been received ', async () => {
        //12. Press SEND EMAIL
        await page('pricingCalculator').emailYourEstimateForm.sendEmailBtn.click()
        await browser.pause(3000)
        await browser.switchWindow(page('yopmailPage').url)                    
        await waitAndClick(page('yopmailPage').checkInboxButton, 3000)
        await page('yopmailPage').switchFrame()
        await expect(page('yopmailPage').mailHeader).toHaveText('Google Cloud Price Estimate')
    });

    it('The Total Estimated Monthly Cost in the letter should matches what is displayed on the Pricing calculator page', async () => {
        //13. Wait for the letter with the cost calculation and check that the Total Estimated Monthly Cost in the letter matches what 
        //is displayed in the calculator
        await expect(page('yopmailPage').totalEstimatedMonthlyCost).toHaveText('USD 1,081.20') 
    });
    
});