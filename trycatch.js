// try {
//   if (fs.existsSync(memeFolder)) {
//     console.log('Directory exists.');
//     fs.rmdir(memeFolder, () => {
//       console.log('Folder Deleted!');
//     }); // folder deleted
//   } else {
//     console.log('Directory does not exist.');
//     fs.mkdir(memeFolder, (err) => {
//       if (err) {
//         return console.error(err);
//       }
//     });
//   }
// } catch (e) {
//   console.log('An error occurred.');
// }
