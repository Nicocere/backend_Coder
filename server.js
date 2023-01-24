import express from 'express'
import ProductManager from './ProductManager/ProductManager.js'
import http from 'http'


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('Products.json')
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// ------- RUTAS --------

// todos los productos
app.get('/', async (req, res) => {
    const prods = await productManager.getProduct(req.query)
    // const {limit, order} = req.query
    res.json({ prods })
})

// productos con limites
app.get('/productos', async (req, res) => {
    const prods = await productManager.getProduct(req.query)
    const { limit, order } = req.query
    const prodLimit = prods.slice(0, limit)
    res.json({ prodLimit })
})


// productos por ID
app.get('/detail/:idProd', async (req, res) => {
    const { idProd } = req.params
    console.log("REq.params", idProd)
    const prodID = await productManager.getProductById(parseInt(idProd))
    // console.log("PROD ID server", JSON.stringify(prodID))

    res.json({ prodID })
})

// CREAR producto
app.post('/prod', async (req, res) => {
    const prodNuevo = req.body
    console.log("prodNuevo SERVER ", prodNuevo)

    const addProd = await productManager.addProduct(prodNuevo)
    console.log("ADD PROD", addProd)

    res.json({ message: 'usuario creado con exito', addProd })
})

// eliminar todos los productos
app.delete('/delete/all', async (req, res) => {
    await productManager.deleteAllProducts()
    res.send('Todos los productos fueron eliminados eliminados')
})


// eliminar producto por ID
app.delete('/delete/:idProd', async (req, res) => {
    const { idProd } = req.params
    console.log("ID del PROD que se eliminara", idProd)
    await productManager.deleteProduct(parseInt(idProd))
    res.send('Usuario eliminado con exito')
})


app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})