import { Router } from "express";
import CartManager from '../CartManager/CartManager.js'
const cartManager = new CartManager('../ProductManager/Productos.json')

const router = Router();

// todos los productos
router.get('/', async (req, res) => {
    const prods = await cartManager.getProduct(req.query)
    // const {limit, order} = req.query
    res.json({ prods })
})

// productos con limites
router.get('/cart', async (req, res) => {
    const prods = await cartManager.getProduct(req.query)
    const { limit, order } = req.query
    const prodLimit = prods.slice(0, limit)
    res.json({ prodLimit })
})


// productos por ID
router.get('/:idProd', async (req, res) => {
    const { idProd } = req.params
    // console.log("REq.params", idProd)
    const prodID = await cartManager.getProductById(parseInt(idProd))
    // console.log("PROD ID server", JSON.stringify(prodID))

    res.json({ prodID })
})

// CREAR producto
router.post('/newprod', async (req, res) => {
    const prodNuevo = req.body
    // console.log("prodNuevo SERVER ", prodNuevo)
    const addProd = await cartManager.addProduct(prodNuevo)
    // console.log("ADD PROD", addProd)

    res.json({ message: 'Producto creado exitosamente', addProd })
})

// eliminar todos los productos
router.delete('/delete/all', async (req, res) => {
    await cartManager.deleteAllProducts()
    res.send('Todos los productos fueron eliminados eliminados')
})


// eliminar producto por ID
router.delete('/delete/:idProd', async (req, res) => {
    const { idProd } = req.params
    // console.log("ID del PROD que se eliminara", idProd)
    await cartManager.deleteProduct(parseInt(idProd))
    res.send('Producto eliminado exitosamente')
})



export default router