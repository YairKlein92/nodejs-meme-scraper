import fs from 'fs'; //  sending downloaded image to folder
import client from 'https'; //  downloading image
import fetch from 'node-fetch';
import path from 'path';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/'; //  website with the memes

const response = await fetch(memeUrl);
const body = await response.text(); // body of the html
const memeFolder = './memes';

//  console.log(body);

const expression =
  /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
//  const exp = '^https://api.memegen.link/images$'

// creating an array of all the parts that start with https://  (our regular expression)
const arrayLinks = [];
const matches = body.match(expression);
for (const match in matches) {
  arrayLinks.push(matches[match]);
}

//  getting IMG links out of the link with filter -> I need to download them
const newArray = arrayLinks.filter((name) => {
  return !name.includes('memecomplete.com');
});
//  console.log(newArray);
const links = newArray.slice(4, 14);
console.log(links);

//  looping through the links in the array
//  for (let link in links) {
//  }

function manageFolder() {
  if (fs.existsSync(memeFolder)) {
    fs.rmdir(memeFolder, () => {});
    setTimeout(() => {
      fs.mkdirSync(memeFolder);
    }, 600);
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
//manageFolder();

// Downloading The pictures and sending them to the right folder
downloadImage(
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300"',
  './memes/first.jpg',
);
