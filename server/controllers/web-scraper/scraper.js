const sleep = require("./utils.js");
const puppeteer = require("puppeteer");

Date.prototype.getMonthWeek = function() {
  var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  return Math.ceil((this.getDate() + firstDay) / 7);
};

let scraper = async (
  origin,
  destination,
  startingWeekOf,
  endingWeekOf,
  startingDayOfWeek,
  endingDayOfWeek
) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.travelocity.com");
  //   await page.waitFor(500);
  await sleep(page, 60000);
  //might need to be more than 5
  await page.type("#package-origin-hp-package", `          ${origin}`, {
    delay: 5
  });
  //   await page.waitFor(200);
  await sleep(page, 60000);
  await page.type(
    "#package-destination-hp-package",
    `           ${destination}`,
    { delay: 5 }
  );
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#package-departing-hp-package");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click(
    //_____________________________________________________  Left Calendar   ___________________WEEK OF MONTH  ____DAY OF WEEK   ___________
    `#package-departing-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(${startingWeekOf}) > td:nth-child(${startingDayOfWeek}) > button`
  );
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#package-returning-hp-package");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click(
    `#package-returning-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(${endingWeekOf}) > td:nth-child(${endingDayOfWeek}) > button`
  );
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.select("#package-1-adults-hp-package", "1");
  //   await page.waitFor(1000);
  await sleep(page, 60000);
  await page.click("#search-button-hp-package");
  //   await page.waitFor(1000);
  await page.waitFor(20000);
  const url = await page.url();
  // await page.waitFor(4000);
  // page.once("loaded", () => {
  // const hotels = page.evaluate(() =>
  //   [...document.querySelectorAll(".hotel")].map(elem => elem.innerText)
  // );
  // console.log(hotels);
  // console.log(url);
  // }); li.actualPrice
  const hotels = await page.evaluate(() =>
    [...document.querySelectorAll("h3.visuallyhidden")].map(
      elem => elem.innerText
    )
  );
  const prices = await page.evaluate(() =>
    [...document.querySelectorAll("li.actualPrice")].map(elem => elem.innerText)
  );
  const pictures = await page.evaluate(() =>
    [...document.querySelectorAll(".hotel-thumbnail")].map(
      elem => JSON.parse(JSON.stringify(getComputedStyle(elem).backgroundImage))
      // JSON.parse(JSON.stringify(getComputedStyle(elem)))
    )
  );
  browser.close();
  // console.log(hotels);
  // console.log(url);
  let setUp = [];
  for (let i = 0; i < 6; i++) {
    setUp.push({ hotel: hotels[i], price: prices[i], image: pictures[i] });
  }
  return { setUp };
};

let scrape = (req, res) => {
  let { origin, destination, starting, ending } = req.query;
  let newStart = new Date(starting);
  let newEnd = new Date(ending);
  let startingWeekOf = newStart.getMonthWeek();
  let endingWeekOf = newEnd.getMonthWeek();
  let startingDayOfWeek = newStart.getDay() + 1;
  let endingDayOfWeek = newEnd.getDay() + 1;

  scraper(
    origin,
    destination,
    startingWeekOf,
    endingWeekOf,
    startingDayOfWeek,
    endingDayOfWeek
  ).then(results => res.status(200).json(results));
};
module.exports = {
  scrape
};
