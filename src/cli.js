#!/usr/bin/env node
// import {getArrayOfObjectsLinks,onlyStats,onlyBrokesLinks,onlystatusLinks} from 'read.js'  
// const [,, ...args]= process.argv
// console.log(`hrllo ${args}`);

// mdlinks(path, options).then((result) => console.log(result))
import {mdLinks }from './read.js'  ;

import path from 'path'

const options = {
    validate: false,
    stats: false
  };
  
  const [, , ...args] = process.argv;
  const [ruta, ...options1n2] = args;
  //const md = args[0];

// console.log(ruta);
// console.log(md);

const absolutePath = path.resolve(ruta);

options1n2.forEach((option) => {
    if ((option === '-v' || option === '--validate') && (option === '-s' || option === '--stats')) {
      options.validate = true;
      options.stats = true;
    }
    if (option === '-v' || option === '--validate') {
      options.validate = true;
    }
    if (option === '-s' || option === '--stats') {
      options.stats = true;
    }
  });

  mdLinks(absolutePath,options).then(links => console.log(links)).catch(err => console.log(err));
