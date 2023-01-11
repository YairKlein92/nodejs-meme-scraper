import createBrowserless from 'browserless';
import getHTML from 'html-get';
// Spawn Chromium process once
const browserlessFactory = createBrowserless();

// Kill the process when Node.js exit
process.on('exit', () => {
  console.log('closing resources!');
  browserlessFactory.close();
});

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
let htmlContent = '';
const getContent = async (url) => {
  // create a browser context inside Chromium process
  const browserContext = browserlessFactory.createContext();
  const getBrowserless = () => browserContext;
  const result = await getHTML(url, { getBrowserless });
  // close the browser context after it's used
  await getBrowserless((browser) => browser.destroyContext());
  return result;
};

getContent(memeUrl)
  .then((content) => {
    htmlContent = content;
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

htmlContent = await getContent(memeUrl);
console.log(htmlContent);

let imageTags = document.getElementsByTagName('img'); // Returns array of <img> DOM nodes
const sources = [];
for (let i in imageTags) {
  let src = imageTags[i].src;
  sources.push(src);
}

import fetch from 'node-fetch';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(memeUrl);
const body = await response.text();

console.log(body);

import request from 'request';
import cheerio from 'cheerio';

const URL_TO_PARSE = 'https://memegen-link-examples-upleveled.netlify.app/';

// Make a request to get the HTML of the page
request(URL_TO_PARSE, (err, response, body) => {
  if (err) throw new Error('Something went wrong');
  // Load the HTML into cheerio's DOM
  const $ = cheerio.load(body);
  // Print the text nodes of the <table> in the HTML
  console.log($('img').text());
});
