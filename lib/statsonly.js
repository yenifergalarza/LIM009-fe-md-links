"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = exports.onlyStatusLinks = exports.onlyStats = exports.onlyBrokesLinks = exports.leadMd = exports.mdFiles = exports.readDir = exports.getArrayOfObjectsLinks = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getArrayOfObjectsLinks = function getArrayOfObjectsLinks(markdownfile, path) {
  var markdownRegex = /\[(.+)\](\((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
  var arrayObject = [];
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
  return arrayObject;
}; //onlyBrokesLinks(getArrayOfObjectsLinks(markdown));
//onlyStats(getArrayOfObjectsLinks(markdown));
// onlystatusLinks(getArrayOfObjectsLinks(markdown));


exports.getArrayOfObjectsLinks = getArrayOfObjectsLinks;

var readDir = function readDir(absolutePath) {
  var pathArray = [];
  var absoluteRoute;

  _fs["default"].readdir(absolutePath, function (err, data) {
    var files = data; // console.log(files);
    //let pathOfDir = path.resolve(absolutePath);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var x = _step.value;
        absoluteRoute = _path["default"].join(absolutePath, x); // console.log(absoluteRoute);

        if (_fs["default"].statSync(absoluteRoute).isDirectory()) {
          pathArray.concat(readDir(absoluteRoute));
        } else if (_path["default"].extname(absoluteRoute) === ".md") {
          //  console.log(absoluteRoute);
          //return absolutePath
          pathArray.push(absoluteRoute);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log("pathArray", pathArray);
    var eachLink = pathArray.map(function (item) {
      return readMd(item);
    });
    console.log(eachLink.forEach(function (content) {
      return content.then(function (link) {
        return link;
      });
    })); // console.log(pathArray);
  }); // for (let i = 0; i < pathArray; i++) {
  //  return readMd(i)
  // }


  return pathArray;
}; // const result = getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString(), absolutePath);


exports.readDir = readDir;

var mdFiles = function mdFiles(absolutePath) {
  var arrayOfFiles = [];

  try {
    var stats = _fs["default"].statSync(absolutePath);

    console.log(absolutePath, "linea98");

    if (stats.isFile() && _path["default"].extname(stats) === ".md") {
      arrayOfFiles.concat(stats);
      return arrayOfFiles;
    } else {
      var next = "";

      var files = _fs["default"].readdirSync(absolutePath);

      for (var x in files) {
        next = _path["default"].join(dir, files[x]);

        if (_fs["default"].statSync(next).isDirectory()) {
          mdFiles(next);
        } else if (_path["default"].extname(next) === ".md") {
          return mdFiles(next);
        }
      }

      arrayOfFiles.concat(readDirMd(stats));
      return arrayOfFiles; // resolve(arrayOfFiles.concat(absolutePath));
    }
  } catch (err) {
    console.log('la ruta no existe');
  }
};

exports.mdFiles = mdFiles;

var getLinks = function getLinks(absolutePath) {
  return new Promise(function (resolve, reject) {
    resolve(mdFiles(absolutePath));
  }); //.forEach(pathMd => getArrayOfObjectsLinks(fs.readFileSync(pathMd).toString(), pathMd))
};

var leadMd = function leadMd(absolutePath) {
  return new Promise(function (resolve, reject) {
    _fs["default"].stat(absolutePath, function (err, stats) {
      if (stats === undefined) {
        reject("error");
      } else {
        if (stats.isFile()) {
          console.log("es un archivo");

          if (_path["default"].extname("".concat(absolutePath)) == ".md") {
            //console.log("es md");
            var result = getArrayOfObjectsLinks(_fs["default"].readFileSync(absolutePath).toString(), absolutePath); //console.log(result);

            resolve(result); //  return r
          } else {
            reject(function () {
              return "no  tiene ext md";
            });
          }
        } else {
          console.log("es un directorio");

          _path["default"].resolve(absolutePath);

          resolve(readDir(absolutePath));
        }

        ;
      }
    });
  });
};

exports.leadMd = leadMd;

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