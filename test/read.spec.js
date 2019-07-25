import {
  getArrayOfObjectsLinks,
  onlyBrokesLinks,
  onlyStats,
  onlyStatusLinks,
  mdLinks,
  getLinks,
  mdFiles
} from "../src/read.js";
//ok
test("deberia retornar un array de objects", (done) => {
  expect(getArrayOfObjectsLinks(`Preámbulo
[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. 

usareemos nodejs [Node.js](https://nodejs.org/), que lea y analice archivos
en formato markdown`, '/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md')).toEqual([{
    text: 'Markdown',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: '/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md'
  }, {
    text: 'Node.js',
    href: 'https://nodejs.org/),',
    file: '/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md'
  }]);
  done();
});
//ok
test("deberia devolver un array que coontiene links repetidos y unicos ", (done) => {
  expect(onlyStats([{
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
    }
  ])).toEqual([3, 2]);
  done();
});

//ok

test('si paso un link roto y un link bueno', (done) => {
    expect(onlyBrokesLinks([{
      text: 'Path',
      href: 'https://google.com/',
      file: ' ruta',
      status: 202
    }, {
      text: 'Path',
      href: 'link malito',
      file: ' ruta',
      status: 403
    }])).toEqual(1);

    done();
  }


);



test('si paso un array de objetos esta funcion me devuelve pero con status y status text', (done) => {
  onlyStatusLinks([{
    text: 'Path',
    href: 'https://google.com',
    file: ' ruta'
  }]).then((data) => {
    expect(data).toEqual([{
      "file": " ruta",
      "href": "https://google.com",
      "status": 200,
      "statustext": "Ok",
      "text": "Path"
    }]);
    done();
  })
})



// test('',(done)=>{
// expect(mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true})).toEqual(1)
// })


test('si pasas el mdlink sin validate o sin stats retorna un array de objetos ', (done) => {
  mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md', {
    validate: false,
    stats: false
  }).then((data) => {
    expect(data).toEqual([{"file": "/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md","href": "https://es.wikipedia.org/wiki/Markdown",
    "text": "Markdown",

  },{"file": "/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md", "href": "https://nodejs.org/),",
  "text": "Node.js",}]) ;done();
  })
});

test('si pasas el mdlink con validate sin stats retorna un array de objetos con status de links ', (done) => {
  mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md', {
    validate: true,
    stats: false
  }).then((data) => {
    expect(data).toEqual([{"file": "/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md", "href": "https://es.wikipedia.org/wiki/Markdown", "status": 200, "statustext": "Ok", "text": "Markdown"}, {"file": "/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md", "href": "https://nodejs.org/),", "status": 404, "statustext": "Fail", "text": "Node.js"}]
    );
    done();

  })
});


test('si pasas el mdlink sin validate con stats retorna un array que contiene links repetidos y unicos',  (done) => {
  mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md',{validate:false,stats :true}).then((data) => {
      expect(data).toEqual([2, 2]);
      done();
})});

test("funciona el lector de carpeta en algo vacio",(done)=>{
  getLinks(['']).then(data=>
  expect(data).toEqual({}    ))
  done();
});

test('si a la funcion mdFiles le paso la ruta de una carpeta me devuelve un array que contiene la ruta de los objetos ', () => {
  expect(mdFiles('src')).toEqual(["src/README.md", "src/src2/README.md", "src/src2/src3/README.md"]);

})

test('si a la funcion mdFiles le paso la ruta de una carpeta me devuelve un array que contiene la ruta de los objetos ', () => {
  expect(mdFiles('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md')).toEqual(["/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/src/src2/README.md"]);

})

test('si a la funcion mdFiles le paso una ruta mala me devuelve un array que contiene undefined ', () => {
  expect(mdFiles('/README.md')).toEqual();

})