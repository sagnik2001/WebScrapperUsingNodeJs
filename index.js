const puppeteer = require("puppeteer");



(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();


    await page.goto("https://www.chainabuse.com/reports", {
        waitUntil: "domcontentloaded",
    });

    // Get page data
    const reports = await page.evaluate(() => {
        // Fetch the first element with class "quote"
        const reportList = document.querySelectorAll(".create-ScamReportCard");




        return Array.from(reportList).map((report) => {

            const hash = report.querySelector(".create-ResponsiveAddress__text")?.innerText;
            const timeAgo = report.querySelectorAll(".type-h5")[1]?.innerText;






            return { hash: hash ? hash : "", AddedInChainAbuse: timeAgo, Source: "ChainAbuse"};
        });
    });

    // Display the quotes
    console.log(reports);

    // Close the browser
    await browser.close();
})();