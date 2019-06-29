


// const path = require('path');
// const axios = require('axios');
// var fs = require('fs');

import path from 'path';

import fs from 'fs'
import axios from 'axios'




export const getArrayOfObjectsLinks = (markdownfile,path) => {

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
      file: `${path}`,
    };
    arrayObject.push(obj);

//console.log("llegue a get aaray objct");

// console.log(`${obj.file} ${obj.href} ${obj.text }`);

  });

  return arrayObject;
 // console.log(arrayObject)

};








 //onlyBrokesLinks(getArrayOfObjectsLinks(markdown));
 //onlyStats(getArrayOfObjectsLinks(markdown));




// onlystatusLinks(getArrayOfObjectsLinks(markdown));



export const readDir = (absolutePath) => {
	fs.readdir(absolutePath, (err, data) => {
   
console.log(data);


let newRoutes  = data.map(function(dataEach) {
 
  const slash = '/';
  return absolutePath.concat(slash,dataEach);
});

newRoutes.forEach(function(element) {
   
absolutePath = element;
 readMd(absolutePath);
});



	})
}



export const readMd = (absolutePath) => {
  return new Promise((resolve,reject)=>{
    fs.stat(absolutePath, function (err, stats) {
      if(stats=== undefined){
        console.log("no existe el elemento");
        
      }
       else{ 
        //  console.log("else de else 1");
        // return stats.isFile() ?  
        // path.extname(`${absolutePath}`)== ".md" ?  getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString()):console.log("no es un md")
        // : stats.isDirectory()?	readDir(absolutePath):console.log("no existe ese elemento,lo siento :(");
        if(stats.isFile()){
          console.log("es un archivo");
          if(path.extname(`${absolutePath}`)== ".md" ){
             console.log("es md");
            
            const result = getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString(),absolutePath);
            //console.log(result);
            resolve(result);
          //  return r
          }
          else{
            console.log("no  tiene ext md");
          }
        
        }
        else{
          console.log("es un directorio");
          resolve(  readDir(absolutePath))        };
      }
     
      
      
    
    })
  }) 
 

};



export const onlyBrokesLinks = (arrayCount) => {
  let brokenLinks = 0;
  let url;
 return Promise.all(
    arrayCount.map(function (link) {
      url = link.href;
      return axios.get(url).then(res => {
        //do nothing
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
  ).then(() => {return brokenLinks});
  
};
export const onlyStats = (arrayCount) => {
  let countNoRepeat = [];
  
  
  arrayCount.forEach(function (link) {
    countNoRepeat.push(link.href);
  
  });


  countNoRepeat = [...new Set(countNoRepeat)];

  let countTotal = arrayCount;
const countBoth =[ countTotal.length ,countNoRepeat.length];

   const showObjCount =(countBoth)=>{
     console.log(`Total: ${countBoth[0]}`);
     console.log(`Unique :${countBoth[1]}`);
     return countBoth;
    }
    return showObjCount(countBoth) ;
};



export const onlyStatusLinks = (arrayCount) => {

  let url;
 return Promise.all(
    arrayCount.map(function (link) {
      url = link.href;
      return axios.post(url).then(res => {
        
       link.statustext="Ok";
       link.status=res.status;
       return link
      }).catch(err => {
        //console.log(err.response.status);
        if (err.response.status) {
          link.statustext="Fail";
         link.status=err.response.status;
        };
        console.log(`${ link.file} ${ link.href} ${  link.statustext} ${  link.status}  ${  link.text}`);
        return arrayCount;
      })
    })
  )
};

export const validateAndStats =(arrayCount)=>{
 onlyBrokesLinks(arrayCount);
 onlyStats(arrayCount);
}
export const mdLinks = (absolutePath, options={}) => new Promise((resolve, reject) => {
  if (fs.existsSync(absolutePath)) {
  //  const arrayLink = readMd(absolutePath);
   return readMd(absolutePath).then(arrayLink =>{

    if (options.validate && options.stats) {
      resolve (validateAndStats(arrayLink));
    } else if (options.validate && !options.stats) {
      resolve (onlyStatusLinks(arrayLink));
    } else if (!options.validate && options.stats) {
      resolve (onlyStats(arrayLink));
    }else{
      resolve(arrayLink)
    }
   })  
    }
    else {
      reject(
    console.log(`La ruta no existe o es incorrecta`));
    
  }
});
//mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true}).then(r => console.log(r));
// readMd('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').then(r => console.log(r))

// let e = getArrayOfObjectsLinks(fs.readFileSync('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').toString())
// console.log(e);
