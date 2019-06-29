
import { getArrayOfObjectsLinks ,onlyBrokesLinks,onlyStats,onlyStatusLinks,mdLinks} from "../src/read";

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


test('si paso un link roto y un link bueno',(done)=>{
  onlyBrokesLinks( [ {
    text: 'Path',
    href: 'https://google.com/',
    file: ' ruta'
  },{
    text: 'Path',
    href: 'https://nodejs.org/api/path.html)))):)',
    file: ' ruta'
  }]).then(
    (data) =>{expect(data).toEqual(1);
     
    done();
  }
    
 
)});

//errror que no entiendo 

test('',(done)=>{
  onlyStatusLinks([ {
    text: 'Path',
    href: 'https://google.com/',
    file: ' ruta'
  },{
    text: 'Path',
    href: 'https://nodejs.org/api/path.html:)',
    file: ' ruta'
  }]).then((data)=>{
    expect(data).toEqual([[{"file": " ruta", "href": "https://google.com/", "status": 405, "statustext": "Fail", "text": "Path"}, {"file": " ruta", "href": "https://nodejs.org/api/path.html:)", "status": 405, "statustext": "Fail", "text": "Path"}], [{"file": " ruta", "href": "https://google.com/", "status": 405, "statustext": "Fail", "text": "Path"}, {"file": " ruta", "href": "https://nodejs.org/api/path.html:)", "status": 405, "statustext": "Fail", "text": "Path"}]]
    );
    done();
  }
  )})



// test('',(done)=>{
// expect(mdLinks('/home/yennialex/Documents/Web Development js/LIM009-fe-md-links/README.md',{validate:true})).toEqual(1)
// })



test('si pasas el mdlink sin validate o stats retorna un array de objetos ',  (done) => {
    mdLinks('./readme.js',{validate:false,stats :false}).then((data) => {
        expect(data).toEqual("algo");
        done();
})});

test('si pasas el mdlink con validate sin stats retorna un array de objetos con status de links ',  (done) => {
  mdLinks('./readme.js',{validate:true,stats :false}).then((data) => {
      expect(data).toEqual("algo");
      done();
})});

test('si pasas el mdlink con validate sin stats retorna un array que contiene links repetidos y unicos',  (done) => {
  mdLinks('./readme.js',{validate:false,stats :true}).then((data) => {
      expect(data).toEqual("algo");
      done();
})});
