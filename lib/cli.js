#!/usr/bin/env node
// import {getArrayOfObjectsLinks,onlyStats,onlyBrokesLinks,onlystatusLinks} from 'read.js'  
// const [,, ...args]= process.argv
// console.log(`hrllo ${args}`);
// mdlinks(path, options).then((result) => console.log(result))
"use strict";

var _read = require("./read.js");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var options = {
  validate: false,
  stats: false
};

var _process$argv = _toArray(process.argv),
    args = _process$argv.slice(2);

var _args = _toArray(args),
    ruta = _args[0],
    options1n2 = _args.slice(1); //const md = args[0];


var ruta1 = args[2];
var vali = process.argv[3];
var vali2 = process.argv[4]; // console.log(ruta);
// console.log(md);

var absolutePath = _path["default"].resolve(ruta);

options1n2.forEach(function (option) {
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
(0, _read.mdLinks)(absolutePath, options).then(function (links) {
  return console.log(links);
});