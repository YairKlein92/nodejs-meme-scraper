import fs from 'node:fs'; //  sending downloaded image to folder
import client from 'node:https'; //  downloading image
import path from 'node:path';
import fetch from 'node-fetch';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/'; //  website with the memes
const response = await fetch(memeUrl);
const body = await response.text(); // body of the html
const memeFolder = 'C:/Users/sympl/projects/nodejs-meme-scraper/memes';
// regular expression for https://
const expression =
  /(https?:\/\/(?:www\.|(?!www))[^\s\\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;

// creating an array of all the parts that start with    (our regular expression)
const arrayLinks = [];
const matches = body.match(expression);

for (const match in matches) {
  arrayLinks.push(matches[match]);
}

//  getting the right links out of all the links with filtering them
const newArray = arrayLinks.filter((name) => {
  return !name.includes('memecomplete.com');
});

//  Getting only 10 links, the first 4 were irrelevant links
const links = newArray.slice(4, 14);

// function that clears the folder if it is not already empty
function manageFolder() {
  console.log('Memes folder is being created/cleared');
  fs.readdir(memeFolder, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(memeFolder, file), (error) => {
        if (error) throw error;
      });
    }
  });
}

// function for downloading pictures
function downloadImage(url, filepath) {
  client.get(url, (res) => {
    res.pipe(fs.createWriteStream(filepath));
  });
}

// Function that runs the program
// Number() makes sure that it wont be a string concatenation
function startProgram() {
  for (const link in links) {
    setTimeout(() => {
      console.log(`Downloading ${Number(link) + 1}. image is in process..`);
      downloadImage(links[link], `./memes/0${Number(link) + 1}.jpg`);
    }, 3500);
  }
}

manageFolder();
startProgram();
setTimeout(() => {
  console.log('Pictures are Downloaded.');
}, 5500);
