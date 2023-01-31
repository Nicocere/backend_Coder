import express from 'express'
import ProductManager from './ProductManager/ProductManager.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import productosRouter from './routes/productos.router.js'
import cartRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'


const productManager = new ProductManager('Productos.json')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// configurar handlebars
app.engine('handlebars',handlebars.engine()) // unicamente lo hacemos para handlebars o para crear un motor propio
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')



// ------- routes ------
app.use('/productos', productosRouter)
app.use('/cart', cartRouter)
app.use('/views', viewsRouter)

app.get('/', (req, res) => {
    res.send({ message:'Estas en el INICIO :) ' })
})


app.listen(8080, () => {
     console.log('Escuchando al puerto 8080')
})