import fetch from 'node-fetch';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const response = await fetch(memeUrl);
const body = await response.text();

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
newArray = newArray.slice(4, 14);
console.log(newArray);
