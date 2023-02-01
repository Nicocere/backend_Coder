import { Router } from "express";
import CartManager from '../CartManager/CartManager.js'
const cartManager = new CartManager('../ProductManager/Productos.json')

const router = Router();

// CREAR nuevo carrito
router.post('/', async (req, res) => {
    let carrito = [{
        id: 0,
        productos: []
    }]

    console.log("carrito", carrito)

    await cartManager.newCart(carrito)

    carrito.push(req.body)

})


// todos los productos del carrito
router.get('/allProducts', async (req, res) => {
    const prods = await cartManager.getCart(req.query)
    // const {limit, order} = req.query
    res.json({ prods })
})


// AGREGAR PROD NUEVO AL ARRAY PRODUCTO DEL CARRITO
router.post('/:id/product/:idProd', async (req, res) => {
    const prodNuevo = req.body
    console.log("prodNuevo CART.ROUTER ", prodNuevo)

    let {id} = req.params
    let {idProd} = req.params

    console.log("ID,", idProd)

    const carrito = { id, idProd, ...prodNuevo }
    console.log("carrito cart.router", carrito)

    const addProd = await cartManager.addProduct(carrito)
    console.log("ADD PROD, CART.ROUTER", addProd)

    res.json({ message: 'Producto creado exitosamente', addProd })
})

// TRAER LOS PRODUCTOS
router.get('/:idProd', async (req, res) => {
    const { idProd } = req.params
    // console.log("REq.params", idProd)
    const prodID = await cartManager.getProductById(parseInt(idProd))
    // console.log("PROD ID server", JSON.stringify(prodID))

    res.json({ prodID })
})

// // productos con limites
// router.get('/cart', async (req, res) => {
//     const prods = await cartManager.getProduct(req.query)
//     const { limit, order } = req.query
//     const prodLimit = prods.slice(0, limit)
//     res.json({ prodLimit })
// })






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