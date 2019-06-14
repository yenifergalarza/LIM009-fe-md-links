// const fs = require('fs');
// const path = require('path');
// //var md = require('markdown-it')();
// //var result = md.render('# markdown-it rulezz!');

//  console.log("hola");
//  fs.readFile('../README.md', (err, data) => {
//   if (err) throw err;

//   let dataToString = data;
//   console.log(String.fromCharCode(...dataToString ));

//   let arrayOfObjectLinks = [];
// });

"use strict";
const axios = require('axios');
var fs = require('fs');
let markdown;
const getMarkdownIsNotAbuffer = (path) => {
  markdown = fs.readFileSync(path).toString();
}

getMarkdownIsNotAbuffer('../README.md');


/* 
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…

  if ( everything turned out fine ) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});



promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});

 */





const getArrayOfObjectsLinks = (markdownfile) => {

  const markdownRegex = /\[(.+)\](\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  const arrayObject = [];
  let arrayUrl = markdownfile.match(markdownRegex);
  arrayUrl.forEach(function (link) {
    const textRegex = /\[(.+)\]/gi;
    //with negative lookahead and negative lookbehind
    const withoutBrackets = /((?!\[)(.+)(?<!\]))/gi;

    const urlRegex = /((ftp|http|https):\/\/(.+)(?<!\)))/gi;

    let text = (link.match(textRegex));
    text = text[0].match(withoutBrackets)
    const url = link.match(urlRegex)

    const obj = {
      text: text[0],
      href: url[0],
      file: "ruta de archivo",
    }
    arrayObject.push(obj);
  });
  console.log(arrayObject);

  console.log("ya conto");
  return arrayObject;


};




const countLinkWithOutValidate = (arrayCount) => {
  let countNoRepeat = [];
  arrayCount.forEach(function (link) {
    countNoRepeat.push(link.href);
  });

  countNoRepeat = [...new Set(countNoRepeat)];
  let countTotal = arrayCount;
  console.log(countTotal.length);
  console.log(countNoRepeat.length);
};

countLinkWithOutValidate(getArrayOfObjectsLinks(markdown));
const validate = (arrayCount) => {
  let brokenLinks = 0;
  let url;
  Promise.all(
    arrayCount.map(function (link) {
      url = link.href;
      return axios.post(url).then(res => {
        console.log(res.status)
      }).catch(err => {
        //console.log(err.response.status);
        if (err.response.status) {
          /*  */
          // brokenLinks.push(err.response.status);
          brokenLinks += 1;
        };
        return brokenLinks;
      })
    })
  ).then(() =>  console.log(brokenLinks));

};
validate(getArrayOfObjectsLinks(markdown));