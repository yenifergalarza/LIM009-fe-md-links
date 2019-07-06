
import { getArrayOfObjectsLinks ,onlyBrokesLinks,onlyStats,onlyStatusLinks,mdLinks} from "../src/read";
//ok
test ("deberia retornar un array de objects",(done)=>{
expect(getArrayOfObjectsLinks( `Preámbulo
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. 

usareemos nodejs [Node.js](https://nodejs.org/), que lea y analice archivos
en formato markdown`,'/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md'
)).toEqual([{text: 'Markdown',
href: 'https://es.wikipedia.org/wiki/Markdown',
file: '/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md'},{text: 'Node.js',
href: 'https://nodejs.org/),',
file: '/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md'}]);
done();
});
//ok
test("deberia devolver un array que coontiene links repetidos y unicos ",(done)=>{
    expect(onlyStats(  [ {
        text: 'Path',
        href: 'https://nodejs.org/api/path.html',
        file: ' ruta'
      },
      {
        text: 'Linea de comando CLI',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        file: ' ruta'
      }, {
        text: 'Linea de comando CLI',
        href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
        file: ' ruta'
      }])).toEqual([3, 2] );
      done();
});

//ok

test('si paso un link roto y un link bueno',(done)=>{
 expect( onlyBrokesLinks( [ {
  text: 'Path',
  href: 'https://google.com/',
  file: ' ruta',
  status: 202
},{
  text: 'Path',
  href: 'link malito',
  file: ' ruta',
  status: 403
}])).toEqual(1);
     
    done();
  }
    
 
);

//errror que no entiendo 

test('si paso un array de objetos esta funcion me devuelve pero con status y status text',(done)=>{
  onlyStatusLinks([ {
    text: 'Path',
    href: 'https://google.com',
    file: ' ruta'
  }]).then((data)=>{
    expect(data).toEqual([{"file": " ruta", "href": "https://google.com", "status": 405, "statustext": "Fail", "text": "Path"}]
    );
    done();
  }
  )})



// test('',(done)=>{
// expect(mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true})).toEqual(1)
// })



test('si pasas el mdlink sin validate o sin stats retorna un array de objetos ',  (done) => {
    mdLinks('./README.md',{validate:false,stats :false}).then((data) => {
        expect(data).toEqual( [{"file": "./README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "text": "Markdown"}, {"file": "./README.md", "href": "https://nodejs.org/),", "text": "Node.js"}, {"file": "./README.md", "href": "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", "text": "md-links"}, {"file": "./README.md", "href": "https://nodejs.org/es/", "text": "Node.js"}, {"file": "./README.md", "href": "https://developers.google.com/v8/).", "text": "motor de JavaScript V8 de Chrome"}, {"file": "./README.md", "href": "https://nodejs.org/en/),", "text": "Node.js"}, {"file": "./README.md", "href": "https://nodejs.org/docs/latest-v0.10.x/api/modules.html),", "text": "módulos (CommonJS)"}, {"file": "./README.md", "href": "https://nodejs.org/api/fs.html),", "text": "file system"}, {"file": "./README.md", "href": "https://nodejs.org/api/path.html),", "text": "path"}, {"file": "./README.md", "href": "https://nodejs.org/api/http.html#http_http_get_options_callback),", "text": "http.get"}, {"file": "./README.md", "href": "https://daringfireball.net/projects/markdown/syntax),", "text": "markdown"}, {"file": "./README.md", "href": "https://docs.npmjs.com/misc/scripts),", "text": "npm-scripts"}, {"file": "./README.md", "href": "https://semver.org/),", "text": "semver"}, {"file": "./README.md", "href": "https://jestjs.io/", "text": "Jest"}, {"file": "./README.md", "href": "https://docs.npmjs.com/cli/install).", "text": "docs oficiales de `npm install` acá"}, {"file": "./README.md", "href": "https://github.com/Laboratoria/course-parser", "text": "`course-parser`"}, {"file": "./README.md", "href": "https://github.com/markdown-it/markdown-it),", "text": "markdown-it"}, {"file": "./README.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).", "text": "expresiones regulares (`RegExp`)"}, {"file": "./README.md", "href": "https://github.com/markedjs/marked", "text": "marked"}, {"file": "./README.md", "href": "https://github.com/jsdom/jsdom", "text": "JSDOM"}, {"file": "./README.md", "href": "https://github.com/cheeriojs/cheerio", "text": "Cheerio"}, {"file": "./README.md", "href": "https://github.com/markedjs/marked", "text": "marked"}, {"file": "./README.md", "href": "http://community.laboratoria.la/c/js", "text": "foro de la comunidad"}, {"file": "./README.md", "href": "https://github.com/workshopper/learnyounode", "text": "learnyounode"}, {"file": "./README.md", "href": "https://github.com/workshopper/how-to-npm", "text": "how-to-npm"}, {"file": "./README.md", "href": "https://github.com/stevekane/promise-it-wont-hurt", "text": "promise-it-wont-hurt"}, {"file": "./README.md", "href": "https://nodejs.org/es/about/", "text": "Acerca de Node.js - Documentación oficial"}, {"file": "./README.md", "href": "https://nodejs.org/api/fs.html", "text": "Node.js file system - Documentación oficial"}, {"file": "./README.md", "href": "https://nodejs.org/api/http.html#http_http_get_options_callback", "text": "Node.js http.get - Documentación oficial"}, {"file": "./README.md", "href": "https://es.wikipedia.org/wiki/Node.js", "text": "Node.js - Wikipedia"}, {"file": "./README.md", "href": "https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5", "text": "What exactly is Node.js? - freeCodeCamp"}, {"file": "./README.md", "href": "https://www.drauta.com/que-es-nodejs-y-para-que-sirve", "text": "¿Qué es Node.js y para qué sirve? - drauta.com"}, {"file": "./README.md", "href": "https://www.youtube.com/watch?v=WgSc1nv_4Gw", "text": "¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube"}, {"file": "./README.md", "href": "https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html", "text": "¿Simplemente qué es Node.js? - IBM Developer Works, 2011"}, {"file": "./README.md", "href": "https://www.genbeta.com/desarrollo/node-js-y-npm", "text": "Node.js y npm"}, {"file": "./README.md", "href": "http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175", "text": "Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?"}, {"file": "./README.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "text": "Asíncronía en js"}, {"file": "./README.md", "href": "https://docs.npmjs.com/getting-started/what-is-npm", "text": "NPM"}, {"file": "./README.md", "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages", "text": "Publicar packpage"}, {"file": "./README.md", "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages", "text": "Crear módulos en Node.js"}, {"file": "./README.md", "href": "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback", "text": "Leer un archivo"}, {"file": "./README.md", "href": "https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback", "text": "Leer un directorio"}, {"file": "./README.md", "href": "https://nodejs.org/api/path.html", "text": "Path"}, {"file": "./README.md", "href": "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e", "text": "Linea de comando CLI"}, {"file": "./README.md", "href": "https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1", "text": "Comprendiendo Promesas en Js"}]
);
        done();
})});

test('si pasas el mdlink con validate sin stats retorna un array de objetos con status de links ',  (done) => {
  mdLinks('README.md',{validate:true,stats :false}).then((data) => {
      expect(data).toEqual([{"file": "README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": 200, "statustext": "Ok", "text": "Markdown"}, {"file": "README.md", "href": "https://nodejs.org/),", "status": 405, "statustext": "Fail", "text": "Node.js"}, {"file": "README.md", "href": "https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg", "status": 405, "statustext": "Fail", "text": "md-links"}, {"file": "README.md", "href": "https://nodejs.org/es/", "status": 405, "statustext": "Fail", "text": "Node.js"}, {"file": "README.md", "href": "https://developers.google.com/v8/).", "status": 403, "statustext": "Fail", "text": "motor de JavaScript V8 de Chrome"}, {"file": "README.md", "href": "https://nodejs.org/en/),", "status": 405, "statustext": "Fail", "text": "Node.js"}, {"file": "README.md", "href": "https://nodejs.org/docs/latest-v0.10.x/api/modules.html),", "status": 405, "statustext": "Fail", "text": "módulos (CommonJS)"}, {"file": "README.md", "href": "https://nodejs.org/api/fs.html),", "status": 405, "statustext": "Fail", "text": "file system"}, {"file": "README.md", "href": "https://nodejs.org/api/path.html),", "status": 405, "statustext": "Fail", "text": "path"}, {"file": "README.md", "href": "https://nodejs.org/api/http.html#http_http_get_options_callback),", "status": 405, "statustext": "Fail", "text": "http.get"}, {"file": "README.md", "href": "https://daringfireball.net/projects/markdown/syntax),", "status": 404, "statustext": "Fail", "text": "markdown"}, {"file": "README.md", "href": "https://docs.npmjs.com/misc/scripts),", "status": 403, "statustext": "Fail", "text": "npm-scripts"}, {"file": "README.md", "href": "https://semver.org/),", "status": 405, "statustext": "Fail", "text": "semver"}, {"file": "README.md", "href": "https://jestjs.io/", "status": 405, "statustext": "Fail", "text": "Jest"}, {"file": "README.md", "href": "https://docs.npmjs.com/cli/install).", "status": 403, "statustext": "Fail", "text": "docs oficiales de `npm install` acá"}, {"file": "README.md", "href": "https://github.com/Laboratoria/course-parser", "status": 422, "statustext": "Fail", "text": "`course-parser`"}, {"file": "README.md", "href": "https://github.com/markdown-it/markdown-it),", "status": 422, "statustext": "Fail", "text": "markdown-it"}, {"file": "README.md", "href": "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).", "status": 405, "statustext": "Fail", "text": "expresiones regulares (`RegExp`)"}, {"file": "README.md", "href": "https://github.com/markedjs/marked", "status": 422, "statustext": "Fail", "text": "marked"}, {"file": "README.md", "href": "https://github.com/jsdom/jsdom", "status": 422, "statustext": "Fail", "text": "JSDOM"}, {"file": "README.md", "href": "https://github.com/cheeriojs/cheerio", "status": 422, "statustext": "Fail", "text": "Cheerio"}, {"file": "README.md", "href": "https://github.com/markedjs/marked", "status": 422, "statustext": "Fail", "text": "marked"}, {"file": "README.md", "href": "http://community.laboratoria.la/c/js", "status": 403, "statustext": "Fail", "text": "foro de la comunidad"}, {"file": "README.md", "href": "https://github.com/workshopper/learnyounode", "status": 422, "statustext": "Fail", "text": "learnyounode"}, {"file": "README.md", "href": "https://github.com/workshopper/how-to-npm", "status": 422, "statustext": "Fail", "text": "how-to-npm"}, {"file": "README.md", "href": "https://github.com/stevekane/promise-it-wont-hurt", "status": 422, "statustext": "Fail", "text": "promise-it-wont-hurt"}, {"file": "README.md", "href": "https://nodejs.org/es/about/", "status": 405, "statustext": "Fail", "text": "Acerca de Node.js - Documentación oficial"}, {"file": "README.md", "href": "https://nodejs.org/api/fs.html", "status": 405, "statustext": "Fail", "text": "Node.js file system - Documentación oficial"}, {"file": "README.md", "href": "https://nodejs.org/api/http.html#http_http_get_options_callback", "status": 405, "statustext": "Fail", "text": "Node.js http.get - Documentación oficial"}, {"file": "README.md", "href": "https://es.wikipedia.org/wiki/Node.js", "status": 200, "statustext": "Ok", "text": "Node.js - Wikipedia"}, {"file": "README.md", "href": "https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5", "status": 200, "statustext": "Ok", "text": "What exactly is Node.js? - freeCodeCamp"}, {"file": "README.md", "href": "https://www.drauta.com/que-es-nodejs-y-para-que-sirve", "status": 200, "statustext": "Ok", "text": "¿Qué es Node.js y para qué sirve? - drauta.com"}, {"file": "README.md", "href": "https://www.youtube.com/watch?v=WgSc1nv_4Gw", "status": 405, "statustext": "Fail", "text": "¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube"}, {"file": "README.md", "href": "https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html", "status": 200, "statustext": "Ok", "text": "¿Simplemente qué es Node.js? - IBM Developer Works, 2011"}, {"file": "README.md", "href": "https://www.genbeta.com/desarrollo/node-js-y-npm", "status": 200, "statustext": "Ok", "text": "Node.js y npm"}, {"file": "README.md", "href": "http://community.laboratoria.la/t/modulos-librerias-paquetes-frameworks-cual-es-la-diferencia/175", "status": 403, "statustext": "Fail", "text": "Módulos, librerías, paquetes, frameworks... ¿cuál es la diferencia?"}, {"file": "README.md", "href": "https://carlosazaustre.com/manejando-la-asincronia-en-javascript/", "status": 200, "statustext": "Ok", "text": "Asíncronía en js"}, {"file": "README.md", "href": "https://docs.npmjs.com/getting-started/what-is-npm", "status": 403, "statustext": "Fail", "text": "NPM"}, {"file": "README.md", "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages", "status": 403, "statustext": "Fail", "text": "Publicar packpage"}, {"file": "README.md", "href": "https://docs.npmjs.com/getting-started/publishing-npm-packages", "status": 403, "statustext": "Fail", "text": "Crear módulos en Node.js"}, {"file": "README.md", "href": "https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback", "status": 405, "statustext": "Fail", "text": "Leer un archivo"}, {"file": "README.md", "href": "https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback", "status": 405, "statustext": "Fail", "text": "Leer un directorio"}, {"file": "README.md", "href": "https://nodejs.org/api/path.html", "status": 405, "statustext": "Fail", "text": "Path"}, {"file": "README.md", "href": "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e", "status": 400, "statustext": "Fail", "text": "Linea de comando CLI"}, {"file": "README.md", "href": "https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1", "status": 400, "statustext": "Fail", "text": "Comprendiendo Promesas en Js"}]);
      done();
})});

test('si pasas el mdlink sin validate con stats retorna un array que contiene links repetidos y unicos',  (done) => {
  mdLinks('README.md',{validate:false,stats :true}).then((data) => {
      expect(data).toEqual([45, 43]);
      done();
})});
