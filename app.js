import express from 'express'
import ProductManager from './ProductManager/ProductManager.js'
import http from 'http'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import productosRouter from './router/productos.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const productManager = new ProductManager('Productos.json')


// ------- routes ------
app.use('/productos', productosRouter)



app.listen(8080, () => {
    // console.log('Escuchando al puerto 8080')
})