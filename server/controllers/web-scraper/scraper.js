const sleep = require("./utils.js");
const puppeteer = require("puppeteer");

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.travelocity.com");
  //   await page.waitFor(500);
  await sleep(page, 60000);
  //might need to be more than 5
  await page.type("#package-origin-hp-package", "          orlando");
  //   await page.waitFor(200);
  await sleep(page, 60000);
  await page.type("#package-destination-hp-package", "           nashville");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#package-departing-hp-package");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click(
    "#package-departing-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(6) > button"
  );
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#package-returning-hp-package");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click(
    "#package-returning-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(2) > td:nth-child(7) > button"
  );
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.select("#package-1-adults-hp-package", "1");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#search-button-hp-package");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  const url = await page.url();
  // await page.waitFor(4000);
  page.once("loaded", () => {
    const hotels = page.evaluate(() =>
      [...document.querySelectorAll(".hotel")].map(elem => elem.innerText)
    );
    console.log(hotels);
    console.log(url);
  });
};
module.exports = {
  scrape
};
