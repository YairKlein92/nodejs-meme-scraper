import cliProgress from 'cli-progress';
import fs from 'fs'; //  sending downloaded image to folder
import client from 'https'; //  downloading image
import fetch from 'node-fetch';

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/'; //  website with the memes

const response = await fetch(memeUrl);
const body = await response.text(); // body of the html
const memeFolder = './memes';

//  console.log(body);

const expression =
  /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi; // regular expression for links
//  const exp = '^https://api.memegen.link/images$'

// creating an array of all the parts that start with    (our regular expression)
const arrayLinks = [];
const matches = body.match(expression);
for (const match in matches) {
  arrayLinks.push(matches[match]);
}

//  getting IMG links out of the link with filter -> I need to download them
const newArray = arrayLinks.filter((name) => {
  return !name.includes('memecomplete.com');
});

//  Getting only 10 links
const links = newArray.slice(4, 14);

//  looping through the links in the array
//  for (let link in links) {
//  }

function manageFolder() {
  if (fs.existsSync(memeFolder)) {
    //  rmSync instead of rmdirSync bc I delete a non-empty folder, and have to force it. it makes sure to delete the folder at the beginning of the program even if its not empty
    console.log('\nDeleting existing folder..');
    fs.rmSync(memeFolder, { recursive: true, force: true });
    console.log('Folder deleted');
    setTimeout(() => {
      console.log('Creating a folder for the pictures..');
      fs.mkdirSync(memeFolder);
      console.log('Folder created.');
    }, 600); //  fs.rmSync(dir, { recursive: true, force: true });
  } else {
    fs.mkdirSync(memeFolder);
  }
}

function downloadImage(url, filepath) {
  client.get(url, (res) => {
    res.pipe(fs.createWriteStream(filepath));
  });
}

// The Actual Program
// Deleting directory at the beginning of the program
//bar1.start(100, 0);
bar1.start(100, 0);
manageFolder();

// Downloading The pictures and sending them to the right folder
//  Combining downloadImage and looping through.
// Number() makes sure that it wont be a string concatenation
// for (const link in links) {
//   setTimeout(() => {
//     console.log(`Downloading ${Number(link) + 1}. images is in process..`);
//     downloadImage(links[link], `./memes/0${Number(link) + 1}.jpg`);
//   }, 3500);
// }
function startProgram() {
  for (const link in links) {
    setTimeout(() => {
      console.log(`Downloading ${Number(link) + 1}. image is in process..`);
      downloadImage(links[link], `./memes/0${Number(link) + 1}.jpg`);
    }, 1500);
  }
}
startProgram();

setTimeout(() => {
  console.log('Pictures are Downloaded.');
}, 2500);
setTimeout(() => {
  bar2.start(100, 100);
}, 2500);
