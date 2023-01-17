const fs = require('fs')


const path = './file/NewFile.js'

const path2 ='./file/NewFilePath.js'


if (fs.existsSync(path)){

    //LEER
    const info = fs.readFileSync(path, 'utf-8')
    console.log(info)

    //ADICIONAR INFO
    fs.appendFileSync(path, 'Nuevo archivo, segundo texto')
    const infoMod = fs.readFileSync(path, 'utf-8')
    console.log(infoMod)

    //ELIMINAR
    if(path){
        fs.writeFileSync(path2, 'Acabo de crear un nuevo Archivo, y este es el texto')
        fs.unlinkSync(path)
    }
} else {
 //CREAR
    fs.writeFileSync(path, 'Este es el Tercer texto')
}




//Productos en JSON

const productos = [

    {
        nombre: 'iphone',
        precio: 400
    },
    {
        nombre: 'samsung',
        precio: 400
    }
]

const pathJSON = './file/fileJSON.json'

// fs.writeFileSync(pathJSON,JSON.stringify(productos))
