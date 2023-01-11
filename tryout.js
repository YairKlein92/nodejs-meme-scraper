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
