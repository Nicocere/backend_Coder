import express from 'express'
import ProductManager from './ProductManager/ProductManager.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server, Socket } from 'socket.io'

console.log(__dirname)


const productManager = new ProductManager('Productos.json')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// configurar handlebars
app.engine('handlebars', handlebars.engine()) // unicamente lo hacemos para handlebars o para crear un motor propio
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')



// ------- routes ------
app.use('/productos', productosRouter)
app.use('/cart', cartRouter)
app.use('/', viewsRouter)

app.get('/', (req, res) => {
    // res.send({ message: 'Estas en el INICIO :) ' + 'Para ver el inicio, ingresa a /views' })
    res.render('index')
})


const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})

// websocket

const socketServer = new Server(httpServer)
const newProds = []

socketServer.on('connection',(socket)=>{
    console.log(`Usuario conectado ${socket.id}`)

    socket.on('disconnect',()=>{
        console.log('Uusario desconectado');
    })

    // socket.emit('saludo','Bienvenido a webSocket')

    // socket.on('respuestaSaludo',(mensaje)=>{
    //     console.log(mensaje)
    // })

    socket.on('prods',(obj)=>{
        newProds.push(obj)
        console.log("newprods", newProds)
        socketServer.emit('prods', newProds)
    })

})