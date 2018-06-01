const sleep = require("./utils.js");
const puppeteer = require("puppeteer");

Date.prototype.getMonthWeek = function() {
  var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
  return Math.ceil((this.getDate() + firstDay) / 7);
};

function getWhatMonthCalendar(arr1, arr2) {
  console.log(arr1, arr2);
  if (arr1 === arr2) {
    return true;
  } else {
    return false;
  }
}

function getClickCount(c, e) {
  if (e.getFullYear() > c.getFullYear()) {
    if (e.getMonth() < c.getMonth()) {
      return (
        (e.getFullYear() - c.getFullYear()) * 12 -
        (c.getMonth() - e.getMonth()) -
        1
      );
    } else if (e.getMonth() > c.getMonth()) {
      return (
        (e.getFullYear() - c.getFullYear()) * 12 + (e.getMonth() - c.getMonth())
      );
    } else if (e.getMonth() === c.getMonth()) {
      return (e.getFullYear() - c.getFullYear()) * 12;
    }
  } else if (e.getMonth() > c.getMonth() + 1) {
    return e.getMonth() - (c.getMonth() + 1);
  }
  return 0;
}

let scraper = async (
  origin,
  destination,
  startingWeekOf,
  endingWeekOf,
  startingDayOfWeek,
  endingDayOfWeek,
  monthPicker,
  clickCount
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.travelocity.com");
  // await page.waitFor(40000);
  await sleep(page, 60000);
  //might need to be more than 5
  await page.click("#tab-package-tab-hp");
  await sleep(page, 60000);
  await page.type(
    "#package-origin-hp-package",
    `          ${origin}`,

    {
      delay: 5
    }
  );
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
  for (let i = 0; i < clickCount; i++) {
    await page.click(
      "#package-departing-wrapper-hp-package > div > div > button.datepicker-paging.datepicker-next.btn-paging.btn-secondary.next"
    );
  }
  // await sleep(page, 60000);
  await page.waitFor(3000);
  await page.click(
    //_____________________________________________________  Right Calendar   ___________________WEEK OF MONTH  ____DAY OF WEEK   ___________
    monthPicker && clickCount === 0
      ? `#package-departing-wrapper-hp-package > div > div > div:nth-child(4) > table > tbody > tr:nth-child(${startingWeekOf}) > td:nth-child(${startingDayOfWeek}) > button`
      : `#package-departing-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(${startingWeekOf}) > td:nth-child(${startingDayOfWeek}) > button`

    // `#package-departing-wrapper-hp-package > div > div > div:nth-child(4) > table > tbody > tr:nth-child(4) > td:nth-child(6) > button`
  );
  await page.waitFor(1000);
  // await sleep(page, 60000);
  await page.click("#package-returning-hp-package");
  // await page.waitFor(1000);
  // true &&
  // (await page.click(
  // "#package-departing-wrapper-hp-package > div > div > button.datepicker-paging.datepicker-next.btn-paging.btn-secondary.next"
  //   "#package-returning-wrapper-hp-package > div > div > button.datepicker-paging.datepicker-next.btn-paging.btn-secondary.next"
  // ));
  await sleep(page, 60000);
  await page.click(
    monthPicker
      ? `#package-returning-wrapper-hp-package > div > div > div:nth-child(4) > table > tbody > tr:nth-child(${endingWeekOf}) > td:nth-child(${endingDayOfWeek}) > button`
      : `#package-returning-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(${endingWeekOf}) > td:nth-child(${endingDayOfWeek}) > button`
    // `#package-returning-wrapper-hp-package > div > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(2) > button`
  );
  await sleep(page, 60000);
  await page.select("#package-1-adults-hp-package", "1");
  await sleep(page, 60000);
  await page.click("#search-button-hp-package");
  await page.waitFor(40000);
  const url = await page.url();

  const hotels = await page.evaluate(() =>
    [...document.querySelectorAll("h3.visuallyhidden")].map(
      elem => elem.innerText
    )
  );
  const prices = await page.evaluate(() =>
    [...document.querySelectorAll("li.actualPrice")].map(elem => elem.innerText)
  );
  const pictures = await page.evaluate(() =>
    [...document.querySelectorAll(".hotel-thumbnail")].map(elem =>
      JSON.parse(JSON.stringify(getComputedStyle(elem).backgroundImage))
    )
  );
  // browser.close();
  let setUp = [];
  for (let i = 0; i < 6; i++) {
    setUp.push({ hotel: hotels[i], price: prices[i], image: pictures[i] });
  }
  setUp.unshift(url);
  console.log(setUp);
  return { setUp };
};
// scraper();

let scrape = (req, res) => {
  let { origin, destination, starting, ending } = req.query;
  let newStart = new Date(starting);
  let newEnd = new Date(ending);
  let startingWeekOf = newStart.getMonthWeek();
  let endingWeekOf = newEnd.getMonthWeek();
  let startingDayOfWeek = newStart.getDay() + 1;
  let endingDayOfWeek = newEnd.getDay() + 1;
  let clickCount = getClickCount(new Date(), newStart);
  let currMonth = new Date();
  let monthPicker = getWhatMonthCalendar(
    currMonth.getMonth(),
    newStart.getMonth()
  );
  scraper(
    origin,
    destination,
    startingWeekOf,
    endingWeekOf,
    startingDayOfWeek,
    endingDayOfWeek,
    monthPicker,
    clickCount
  ).then(results => res.status(200).json(results));
};
module.exports = {
  scrape
};
