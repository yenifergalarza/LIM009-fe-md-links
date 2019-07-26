// const path = require('path');
// const axios = require('axios');
// var fs = require('fs');

import path from 'path';

import fs from 'fs'
import axios from 'axios'




export const getArrayOfObjectsLinks = (markdownfile, path) => {
  const arrayObject = [];
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
  return arrayObject;
};


export const mdFiles = (absolutePath) => {
  let arrayOfFiles = [];

  try {
    if (fs.lstatSync(absolutePath).isFile()) {
      if (path.extname(absolutePath) === ".md") {
        arrayOfFiles.push(absolutePath);
      }
      return arrayOfFiles;
    }  else if(fs.lstatSync(absolutePath).isDirectory())
    {
      let next = "";
      const files = fs.readdirSync(absolutePath);
      for (let x in files) {
        next = path.join(absolutePath, files[x]);
        arrayOfFiles = arrayOfFiles.concat(mdFiles(next));
      }

    
      return arrayOfFiles;

    }

    else{
      return undefined
    }
  } catch (err) {
    
    console.log(err);
  }


}





export const getLinks = (absolutePath) => {

  return new Promise((resolve, reject) => {
    let resultado = mdFiles(absolutePath).map(pathMd => getArrayOfObjectsLinks(fs.readFileSync(pathMd).toString(), pathMd));
    resultado = resultado.reduce((previous, current) => {
      return previous.concat(current)
    });
    resolve(resultado);


  });
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
      return axios.get(url).then(res => {

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
    const pathUndefined = `La ruta no existe o es incorrecta`;
    reject(pathUndefined);
    return pathUndefined;
  }
});