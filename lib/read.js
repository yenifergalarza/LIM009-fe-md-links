"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdLinks = exports.validateAndStats = exports.onlyStatusLinks = exports.onlyStats = exports.onlyBrokesLinks = exports.readMd = exports.readDir = exports.getArrayOfObjectsLinks = void 0;

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
    arrayObject.push(obj); //console.log("llegue a get aaray objct");
    // console.log(`${obj.file} ${obj.href} ${obj.text }`);
  });
  return arrayObject; // console.log(arrayObject)
}; //onlyBrokesLinks(getArrayOfObjectsLinks(markdown));
//onlyStats(getArrayOfObjectsLinks(markdown));
// onlystatusLinks(getArrayOfObjectsLinks(markdown));


exports.getArrayOfObjectsLinks = getArrayOfObjectsLinks;

var readDir = function readDir(absolutePath) {
  _fs["default"].readdir(absolutePath, function (err, data) {
    console.log(data);
    var newRoutes = data.map(function (dataEach) {
      var slash = '/';
      return absolutePath.concat(slash, dataEach);
    });
    newRoutes.forEach(function (element) {
      absolutePath = element;
      readMd(absolutePath);
    });
  });
};

exports.readDir = readDir;

var readMd = function readMd(absolutePath) {
  return new Promise(function (resolve, reject) {
    _fs["default"].stat(absolutePath, function (err, stats) {
      if (stats === undefined) {
        console.log("no existe el elemento");
      } else {
        //  console.log("else de else 1");
        // return stats.isFile() ?  
        // path.extname(`${absolutePath}`)== ".md" ?  getArrayOfObjectsLinks(fs.readFileSync(absolutePath).toString()):console.log("no es un md")
        // : stats.isDirectory()?	readDir(absolutePath):console.log("no existe ese elemento,lo siento :(");
        if (stats.isFile()) {
          console.log("es un archivo");

          if (_path["default"].extname("".concat(absolutePath)) == ".md") {
            console.log("es md");
            var result = getArrayOfObjectsLinks(_fs["default"].readFileSync(absolutePath).toString(), absolutePath); //console.log(result);

            resolve(result); //  return r
          } else {
            console.log("no  tiene ext md");
          }
        } else {
          console.log("es un directorio");
          resolve(readDir(absolutePath));
        }

        ;
      }
    });
  });
};

exports.readMd = readMd;

var onlyBrokesLinks = function onlyBrokesLinks(arrayCount) {
  var brokenLinks = 0;
  var url;
  return Promise.all(arrayCount.map(function (link) {
    url = link.href;
    return _axios["default"].get(url).then(function (res) {//do nothing
    })["catch"](function (err) {
      //console.log(err.response.status);
      if (err.response.status) {
        /*  */
        // brokenLinks.push(err.response.status);
        brokenLinks += 1;
      }

      ;
      return brokenLinks;
    });
  })).then(function () {
    return brokenLinks;
  });
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
      }

      ;
      console.log("".concat(link.file, " ").concat(link.href, " ").concat(link.statustext, " ").concat(link.status, "  ").concat(link.text));
      return arrayCount;
    });
  }));
};

exports.onlyStatusLinks = onlyStatusLinks;

var validateAndStats = function validateAndStats(arrayCount) {
  onlyBrokesLinks(arrayCount);
  onlyStats(arrayCount);
};

exports.validateAndStats = validateAndStats;

var mdLinks = function mdLinks(absolutePath) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    if (_fs["default"].existsSync(absolutePath)) {
      //  const arrayLink = readMd(absolutePath);
      return readMd(absolutePath).then(function (arrayLink) {
        if (options.validate && options.stats) {
          resolve(validateAndStats(arrayLink));
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