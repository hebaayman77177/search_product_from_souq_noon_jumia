const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const scrollPageToBottom =require('puppeteer-autoscroll-down');


async function souqScraper(searchText){
    try {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        //to optimize, block loading images and css
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if(req.resourceType() === 'image'){
                req.abort();
            }
            else {
                req.continue();
            }
        });
        page.on('request', (req) => {
            if(req.resourceType() === 'stylesheet' || req.resourceType() === 'font'){
                req.abort();
            }
            else {
                req.continue();
            }
        });
        await page.goto('https://egypt.souq.com/eg-en/');
        
        await page.type('#search_value', searchText)
        await page.click('#searchButton')
        await page.waitForSelector('.list-view')

        const content = await page.content();
        const $ = cheerio.load(content);
        const items = [];
        $('.single-item').each((idx, elem) => {
            /**
             * Get the inner HTML which corresponds to the title in text format.
             */
            const item={};
            item.name = $(elem).data("name");
            item.brand = $(elem).data("brand-name");
            item.category = $(elem).data("category-name");
            item.href = $(elem).find("a").attr("href");
            item.img = $(elem).find("img").data("src");
            item.price =$(elem).find(".itemPrice").text();
            item.shop = "souq";
        
            /**
             * Push the title in titles array.
             */
            items.push(item);
        })
        await browser.close();
        return items;
    } catch (err) {
    }
}
async function noonScraper(searchText){
    try {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()


        await page.goto('https://www.noon.com/egypt-en')
        const url = await page.evaluate(() => location.href);
        await page.type('#searchBar', searchText)
        await page.keyboard.press('Enter');
        await page.waitForSelector('.productList');
        await scrollPageToBottom(page);
    
          
        await page.screenshot({path: 'buddy-screenshot.png'});
        const content = await page.content();
        const $ = cheerio.load(content);
        const items = [];
        $('.productContainer').each((idx, elem) => {
            /**
             * Get the inner HTML which corresponds to the title in text format.
             */
            const item={};
            item.name = $(elem).find('.name').text();
            item.href = url + $(elem).find("a").attr("href"); 
            item.img = $(elem).find("img").attr("src");
            item.price =$(elem).find('.sellingPrice').text();
            item.shop = "noon";
        
            /**
             * Push the title in titles array.
             */
            items.push(item);
        })
        await browser.close();
        return items;
    } catch (err) {
    console.error(err)
    }
}

async function jumiaScraper(searchText){
    try {
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()


        await page.goto('https://www.jumia.com.eg/');
        const url = await page.evaluate(() => location.href);
        await page.type('#fi-q', searchText);
        await page.keyboard.press('Enter');
        await page.waitForSelector('[data-catalog]');
        await scrollPageToBottom(page);
        await page.screenshot({path: 'buddy-screenshot.png'});
        const content = await page.content();
        const $ = cheerio.load(content);
        const items = [];
        $('.prd').each((idx, elem) => {
            /**
             * Get the inner HTML which corresponds to the title in text format.
             */
            const item={};
            const a = $(elem).find("a");
            item.href = url + a.attr("href"); //
            item.price = $(elem).find(".prc").text();//
            item.name = a.data("name");//
            item.category = a.data("category");//
            item.img = $(elem).find("img").data("src");
            item.shop = "jumia";
        
            /**
             * Push the title in titles array.
             */
            items.push(item);
        })
        await browser.close();
        return items;
    } catch (err) {
    console.error(err)
    }
}

module.exports = {
    souqScraper,
    noonScraper,
    jumiaScraper
};