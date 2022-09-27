const { page } = require('../../pageobjects/pages/index.js');
const { waitAndClick } = require('../../utilities/helper.js')

describe ('Hurt Me Plenty', ()=> {

    it.only('Search page should be opened', async () => {
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
           //* What are these instances for ?: leave blank(пуст по умолчанию, надо ли проверять на пустоту?)
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
        await waitAndClick(page('pricingCalculator').setNumberOfGPUs('one'), 3000)
          //* Local SSD: 2x375 Gb
        await page('pricingCalculator').localSSD.click()   
        await waitAndClick(page('pricingCalculator').setLocalSSD('twoX375'), 3000)                 
          //* Datacenter location: Frankfurt (europe-west3)
        await page('pricingCalculator').datacenterLocation.click()
        await waitAndClick(page('pricingCalculator').setDatacenterLocation('frankfurt'), 3000)
          // * Commited usage: 1 Year
        await page('pricingCalculator').commitedUsage.click()
        await waitAndClick(page('pricingCalculator').setCommitedUsage('oneYear'), 3000)
        //7. Click Add to Estimate
        await page('pricingCalculator').addToEstimateBtn.click()

        await expect(page('pricingCalculator').estimateResultBlock.rootEl).toBeDisplayed()
    
      
});

    it('Estimate result page should display correspondent data', async () => {
        
        //8. Check the correspondence of the data of the following fields: VM Class, Instance type, Region, local SSD, commitment term
        await expect(page('pricingCalculator').estimateResultBlock.regionField).toHaveTextContaining('Frankfurt')
        await expect(page('pricingCalculator').estimateResultBlock.provisioningModelField).toHaveTextContaining('Regular')
        await expect(page('pricingCalculator').estimateResultBlock.commitmentTermField).toHaveTextContaining('1 Year')
        await expect(page('pricingCalculator').estimateResultBlock.instanceTypeField).toHaveTextContaining('n1-standard-8')
        await expect(page('pricingCalculator').estimateResultBlock.localSSDField).toHaveTextContaining('2x375 GiB')
        //9. Check that the rental amount per month matches the amount received when passing the test manually.
        await expect(page('pricingCalculator').estimateResultBlock.totalEstimatedCostField).toHaveTextContaining('USD 1,081.20')
    });
            
})


