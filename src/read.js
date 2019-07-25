// const path = require('path');
// const axios = require('axios');
// var fs = require('fs');

import path from 'path';

import fs from 'fs'
import axios from 'axios'



  const arrayObject = [];
export const getArrayOfObjectsLinks = (markdownfile, path) => {

  const markdownRegex = /\[(.+)\](\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;


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
      file: `${path}`,
    };
    arrayObject.push(obj);


  });
  
console.log("termine un proceso")
  return  arrayObject;
//Array.prototype.concat(...arrayObject)

};



//onlyBrokesLinks(getArrayOfObjectsLinks(markdown));
//onlyStats(getArrayOfObjectsLinks(markdown));

// onlystatusLinks(getArrayOfObjectsLinks(markdown));




// const result = getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString(), absolutePath);
  let arrayOfFiles = [];
export const mdFiles = (absolutePath) => {


  try {
    if (fs.lstatSync(absolutePath).isFile()) 
    {
       if (path.extname(absolutePath) === ".md") {
        arrayOfFiles.push(absolutePath);
     
      }  return arrayOfFiles;
    //  else { return arrayOfFiles }
     
    } 
    else {
      let next = "";
      const files = fs.readdirSync(absolutePath);
      for (let x in files) {
        next = path.join(absolutePath, files[x]);

        if (fs.statSync(next).isDirectory()) {
          mdFiles(next);
        } else { 
        // arrayOfFiles.push(absolutePath);
          mdFiles(next);
     
        }
      }

      return arrayOfFiles;
      // resolve(arrayOfFiles.concat(absolutePath));
    }
  } catch (err) {
    console.log(err);
  }


}





const getLinks = (absolutePath) => {

  return new Promise((resolve, reject) => {
    const resultado = mdFiles(absolutePath).map(pathMd => getArrayOfObjectsLinks(fs.readFileSync(pathMd).toString(), pathMd ) )
    resolve(resultado.reduce((acum, current) => acum.concat(current)), [] )
      //
 
  });

  //
};




export const onlyBrokesLinks = (returnOfFuncion) => {
  let result = returnOfFuncion.filter(property => property.status >= 400);
  result = result.length;
  return result;


};
export const onlyStats = (arrayCount) => {
  let countNoRepeat = [];


  arrayCount.forEach(function (link) {
    countNoRepeat.push(link.href);

  });


  countNoRepeat = [...new Set(countNoRepeat)];

  let countTotal = arrayCount;
  const countBoth = [countTotal.length, countNoRepeat.length];

  const showObjCount = (countBoth) => {
    console.log(`Total: ${countBoth[0]}`);
    console.log(`Unique :${countBoth[1]}`);
    return countBoth;
  }
  return showObjCount(countBoth);
};



export const onlyStatusLinks = (arrayCount) => {

  let url;
  return Promise.all(
    arrayCount.map(function (link) {
      url = link.href;
      return axios.post(url).then(res => {

        link.statustext = "Ok";
        link.status = res.status;
        return link
      }).catch(err => {
        //console.log(err.response.status);
        if (err.response.status) {
          link.statustext = "Fail";
          link.status = err.response.status;
          return link;
        };
        // console.log(`${ link.file} ${ link.href} ${  link.statustext} ${  link.status}  ${  link.text}`);
        // return arrayCount;
      })
    })
  ).then(arrayCount);
};

// export const validateAndStats =(arrayCount,returnOfFuncion)=>{
// returnOfFuncion.then(data => {onlyBrokesLinks(data)});
//  onlyStats(arrayCount);
// }
export const mdLinks = (absolutePath, options = {}) => new Promise((resolve, reject) => {
  if (fs.existsSync(absolutePath)) {
    //  const arrayLink = readMd(absolutePath);
    return getLinks(absolutePath).then(arrayLink => {

      if (options.validate && options.stats) {
        resolve(onlyStats(arrayLink));
        if (options.validate && options.stats) {
          resolve(onlyStatusLinks(arrayLink).then(data => {
            console.log(`rotos: ${onlyBrokesLinks(data)}`)
          }));
        };
      } else if (options.validate && !options.stats) {
        resolve(onlyStatusLinks(arrayLink));
      } else if (!options.validate && options.stats) {
        resolve(onlyStats(arrayLink));
      } else {
        (resolve(arrayLink))
      }
    })
  } else {
    reject(
      console.log(`La ruta no existe o es incorrecta`));

  }
});
//mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true}).then(r => console.log(r));
// readMd('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').then(r => console.log(r))

// let e = getArrayOfObjectsLinks(fs.readFileSync('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').toString())
// console.log(e);