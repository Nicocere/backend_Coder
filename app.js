import express from 'express'
import ProductManager from './ProductManager/ProductManager.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import './dbConfig.js'

const productManager = new ProductManager('Productos.json')
const app = express()

// Parsear el cuerpo de la petición a JSON
app.use(express.json())

// Parsear los datos del formulario a objetos
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos
app.use(express.static('public'))

// Configurar handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// Rutas
app.use('/productos', productosRouter)
app.use('/cart', cartRouter)
app.use('/', viewsRouter)

app.get('/', (req, res) => {
    res.render('index')
})

// Manejador de errores para las rutas
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo salió mal')
})

const httpServer = app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})

// WebSocket
const socketServer = new Server(httpServer)

export const newProds = []

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    socket.on('prods', (obj) => {
        newProds.push(obj)
        console.log("newprods", newProds)
        console.log("obj", obj)
        socketServer.emit('prods', newProds)
    })

    socket.emit('pushArray', newProds)
})
