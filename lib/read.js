"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = exports.onlyStatusLinks = exports.onlyStats = exports.onlyBrokesLinks = exports.mdFiles = exports.getArrayOfObjectsLinks = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var arrayObject = [];

var getArrayOfObjectsLinks = function getArrayOfObjectsLinks(markdownfile, path) {
  var markdownRegex = /\[(.+)\](\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  var arrayUrl = markdownfile.match(markdownRegex);
  arrayUrl.forEach(function (link) {
    var textRegex = /\[(.+)\]/gi; //with negative lookahead and negative lookbehind

    var withoutBrackets = /((?!\[)(.+)(?<!\]))/gi;
    var urlRegex = /((ftp|http|https):\/\/(.+)(?<!\)))/gi;
    var text = link.match(textRegex);
    text = text[0].match(withoutBrackets);
    var url = link.match(urlRegex);
    var obj = {
      text: text[0],
      href: url[0],
      file: "".concat(path)
    };
    arrayObject.push(obj);
  });
  console.log("termine un proceso");
  return arrayObject; //Array.prototype.concat(...arrayObject)
}; //onlyBrokesLinks(getArrayOfObjectsLinks(markdown));
//onlyStats(getArrayOfObjectsLinks(markdown));
// onlystatusLinks(getArrayOfObjectsLinks(markdown));
// const result = getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString(), absolutePath);


exports.getArrayOfObjectsLinks = getArrayOfObjectsLinks;
var arrayOfFiles = [];

var mdFiles = function mdFiles(absolutePath) {
  try {
    if (_fs["default"].lstatSync(absolutePath).isFile()) {
      if (_path["default"].extname(absolutePath) === ".md") {
        arrayOfFiles.push(absolutePath);
      }

      return arrayOfFiles; //  else { return arrayOfFiles }
    } else {
      var next = "";

      var files = _fs["default"].readdirSync(absolutePath);

      for (var x in files) {
        next = _path["default"].join(absolutePath, files[x]);

        if (_fs["default"].statSync(next).isDirectory()) {
          mdFiles(next);
        } else {
          // arrayOfFiles.push(absolutePath);
          mdFiles(next);
        }
      }

      return arrayOfFiles; // resolve(arrayOfFiles.concat(absolutePath));
    }
  } catch (err) {
    console.log(err);
  }
};

exports.mdFiles = mdFiles;

var getLinks = function getLinks(absolutePath) {
  return new Promise(function (resolve, reject) {
    var resultado = mdFiles(absolutePath).map(function (pathMd) {
      return getArrayOfObjectsLinks(_fs["default"].readFileSync(pathMd).toString(), pathMd);
    });
    resolve(resultado.reduce(function (acum, current) {
      return acum.concat(current);
    }), []); //
  }); //
};

var onlyBrokesLinks = function onlyBrokesLinks(returnOfFuncion) {
  var result = returnOfFuncion.filter(function (property) {
    return property.status >= 400;
  });
  result = result.length;
  return result;
};

exports.onlyBrokesLinks = onlyBrokesLinks;

var onlyStats = function onlyStats(arrayCount) {
  var countNoRepeat = [];
  arrayCount.forEach(function (link) {
    countNoRepeat.push(link.href);
  });
  countNoRepeat = _toConsumableArray(new Set(countNoRepeat));
  var countTotal = arrayCount;
  var countBoth = [countTotal.length, countNoRepeat.length];

  var showObjCount = function showObjCount(countBoth) {
    console.log("Total: ".concat(countBoth[0]));
    console.log("Unique :".concat(countBoth[1]));
    return countBoth;
  };

  return showObjCount(countBoth);
};

exports.onlyStats = onlyStats;

var onlyStatusLinks = function onlyStatusLinks(arrayCount) {
  var url;
  return Promise.all(arrayCount.map(function (link) {
    url = link.href;
    return _axios["default"].post(url).then(function (res) {
      link.statustext = "Ok";
      link.status = res.status;
      return link;
    })["catch"](function (err) {
      //console.log(err.response.status);
      if (err.response.status) {
        link.statustext = "Fail";
        link.status = err.response.status;
        return link;
      }

      ; // console.log(`${ link.file} ${ link.href} ${  link.statustext} ${  link.status}  ${  link.text}`);
      // return arrayCount;
    });
  })).then(arrayCount);
}; // export const validateAndStats =(arrayCount,returnOfFuncion)=>{
// returnOfFuncion.then(data => {onlyBrokesLinks(data)});
//  onlyStats(arrayCount);
// }


exports.onlyStatusLinks = onlyStatusLinks;

var mdLinks = function mdLinks(absolutePath) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    if (_fs["default"].existsSync(absolutePath)) {
      //  const arrayLink = readMd(absolutePath);
      return getLinks(absolutePath).then(function (arrayLink) {
        if (options.validate && options.stats) {
          resolve(onlyStats(arrayLink));

          if (options.validate && options.stats) {
            resolve(onlyStatusLinks(arrayLink).then(function (data) {
              console.log("rotos: ".concat(onlyBrokesLinks(data)));
            }));
          }

          ;
        } else if (options.validate && !options.stats) {
          resolve(onlyStatusLinks(arrayLink));
        } else if (!options.validate && options.stats) {
          resolve(onlyStats(arrayLink));
        } else {
          resolve(arrayLink);
        }
      });
    } else {
      reject(console.log("La ruta no existe o es incorrecta"));
    }
  });
}; //mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true}).then(r => console.log(r));
// readMd('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').then(r => console.log(r))
// let e = getArrayOfObjectsLinks(fs.readFileSync('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md').toString())
// console.log(e);


exports.mdLinks = mdLinks;