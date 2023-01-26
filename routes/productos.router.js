import { Router } from "express";
import ProductManager from '../ProductManager/ProductManager.js'
const productManager = new ProductManager('Productos.json')



const router = Router();

// todos los productos
router.get('/', async (req, res) => {
    const prods = await productManager.getProduct(req.query)
    // const {limit, order} = req.query
    res.json({ prods })
})

// productos con limites
router.get('/prod', async (req, res) => {
    const prods = await productManager.getProduct(req.query)
    const { limit, order } = req.query
    const prodLimit = prods.slice(0, limit)
    res.json({ prodLimit })
})


// productos por ID
router.get('/detail/:idProd', async (req, res) => {
    const { idProd } = req.params
    // console.log("REq.params", idProd)
    const prodID = await productManager.getProductById(parseInt(idProd))
    // console.log("PROD ID server", JSON.stringify(prodID))

    res.json({ prodID })
})

// CREAR producto
router.post('/newprod', async (req, res) => {
    const prodNuevo = req.body
    // console.log("prodNuevo SERVER ", prodNuevo)
    const addProd = await productManager.addProduct(prodNuevo)
    // console.log("ADD PROD", addProd)

    res.json({ message: 'Producto creado exitosamente', addProd })
})

// ACTUALIZAR un producto

router.put('/upload', async (req, res) => {
    const prodNuevo = req.body
    // console.log("prodNuevo SERVER ", prodNuevo)
    const addProd = await productManager.addProduct(prodNuevo)
    // console.log("ADD PROD", addProd)

    res.json({ message: 'Producto creado exitosamente', addProd })
})


// eliminar todos los productos
router.delete('/delete/all', async (req, res) => {
    await productManager.deleteAllProducts()
    res.send('Todos los productos fueron eliminados eliminados')
})


// eliminar producto por ID
router.delete('/delete/:idProd', async (req, res) => {
    const { idProd } = req.params
    // console.log("ID del PROD que se eliminara", idProd)
    await productManager.deleteProduct(parseInt(idProd))
    res.send('Producto eliminado exitosamente')
})



export default router