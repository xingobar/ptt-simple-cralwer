import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import to from 'await-to-js';

async function run() {
	const browser = await puppeteer.launch({
		headless: false
	});
	const page = await browser.newPage();

	console.log('go to page....');
	let url = 'https://www.ptt.cc/bbs/Gossiping/index.html';

	await page.goto(url);
	//let $ = cheerio.load(url, { decodeEntities: false });

	//if ($('.over18-button-container').length > 0) {
	await page.click('.over18-button-container > button[name="yes"]');
	//}

	await page.waitForNavigation({ waitUntil: 'load' });
	const content = await page.content();

	let $ = cheerio.load(content, { decodeEntities: false });
	let anchorArray = [];

	$('.title a').each((i, e) => {
		anchorArray.push(`https://www.ptt.cc${$(e).attr('href')}`);
	});

	console.log(anchorArray);
}

run();
