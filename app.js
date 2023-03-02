import express from 'express'
import ProductManager from './dao/MongoManagers/ProductManager.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
import './dao/dbConfig.js'
import { MessageModel } from './dao/Models/message.model.js'
import cookieParser from 'cookie-parser'


const productManager = new ProductManager('Productos.json')
const app = express()

// Parsear el cuerpo de la petición a JSON
app.use(express.json())

// Cookie Parser
app.use(cookieParser())
app.get('/createCookie', (req,res)=>{
    res.cookie("primeraCookie65", 'mi primera cookie').send('cookie guardada con exito')
})

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
const usuariosConectados = {}
const infoMensajes = []

socketServer.on('connection', socket => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })


    // MENSAJES
    socket.on('nuevoUsuario', usuarioNuevo => {

        const usuario = {
            user: usuarioNuevo,
        }

        console.log("USUARIO COLOR", usuario)
        socket.broadcast.emit('broadcast', usuario)
    })

    socket.on('mensaje', info => {
        const mensaje = new MessageModel({
            user: info.nombre,
            message: info.mensaje
        });
        console.log("infooooo", info)
        mensaje.save()
            .then(() => console.log('Mensaje guardado en la base de datos'))
            .catch(error => console.log('Error al guardar mensaje en la base de datos', error));

        info.timestamp = Date.now();
        infoMensajes.push(info);
        console.log("mensajes que entraron", infoMensajes);
        socketServer.emit('chat', infoMensajes);

    });

    // PRODUCTOS

    socket.on('prods', (obj) => {
        newProds.push(obj)
        console.log("newprods", newProds)
        console.log("obj", obj)
        socketServer.emit('prods', newProds)
    })

    socket.emit('pushArray', newProds)
})
