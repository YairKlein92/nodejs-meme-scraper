import fs from 'fs'; //sending downloaded image to folder
import https from 'https'; //downloading image
import fetch from 'node-fetch';
import path from 'path';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(memeUrl);
const body = await response.text();
const memeFolder = './memes';

//console.log(body);

const expression =
  /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
//  const exp = '^https://api.memegen.link/images$'
let arrayLinks = [];
let matches = body.match(expression);
for (let match in matches) {
  arrayLinks.push(matches[match]);
}
//  console.log(arrayLinks); //this is the array containing all the links

//  getting IMG links out of the link with filter
let newArray = arrayLinks.filter((name) => {
  return !name.includes('memecomplete.com');
});
//  console.log(newArray);
let links = newArray.slice(4, 14);
console.log(links);

//looping through the links in the array
///for (let link in links) {
//}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`),
        );
      }
    });
  });
}
// Deleting directory at the beginning of the program
function manageFolder() {
  if (fs.existsSync(memeFolder)) {
    fs.rmdir(memeFolder, () => {});
  } else if (!fs.existsSync(memeFolder)) {
    fs.mkdirSync(memeFolder);
  }
}
manageFolder();
//  for (let link in links) {
//  downloadImage(links[link]);
//  }
