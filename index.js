import fetch from 'node-fetch';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(memeUrl);
const body = await response.text();

console.log(typeof body);

const expression =
  /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
//const exp = '^https://api.memegen.link/images$'
let arrayLinks = [];
let matches = body.match(expression);
for (let match in matches) {
  //  console.log(matches[match]);
  arrayLinks.push(matches);
}
console.log(arrayLinks);
