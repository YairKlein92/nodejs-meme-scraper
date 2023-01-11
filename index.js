import fetch from 'node-fetch';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
let htmlContent = '';

const response = await fetch(memeUrl);
const body = await response.text();

console.log(body);
