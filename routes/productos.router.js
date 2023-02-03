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
router.get('/:idProd', async (req, res) => {
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

// router.put('/upload/:idProd', async (req, res) =>{
//     try {
//         let {idProd} = req.params
//         let uploadProd = req.body
//         console.log("ID PROD", idProd)
//         let {title , price , descr, code , stock, status} = uploadProd
//         console.log("UPLOAD PROD",uploadProd)
//         await prod.update({uploadProd}, {
//             where: {
//                 idProd
//             },
//         })
//     } catch (error) {
//        console.log("no se pudo actualizar")
//     }
// })


router.put('/upload/:idProd', async (req, res) => {
    try {

        let { idProd } = req.params
        let id = parseInt(idProd)
        // console.log("ID", id)

        let newProduct = req.body
        console.log("new prod router", newProduct)
        // let { title, price, descr, code, stock, status } = newProduct

        let productUpload = { id, ...newProduct }
        // console.log("productUpload router ", productUpload)
        const uploadProd = await productManager.updateProduct(productUpload)
        // console.log("upload PROD router", uploadProd)

        res.json({ message: 'Producto Actualizado exitosamente', productUpload: newProduct })
        return res.send(uploadProd)

    } catch (error) {
        console.log("no se pudo actualizar")
    }
});


// eliminar todos los productos
router.delete('/delete/all', async (req, res) => {
    await productManager.deleteAllProducts()
    res.send('Todos los productos fueron eliminados eliminados')
});


// eliminar producto por ID
router.delete('/delete/:idProd', async (req, res) => {
    const { idProd } = req.params
    console.log(req.body)
    console.log("ID del PROD que se eliminara", idProd)
    await productManager.deleteProduct(parseInt(idProd))


    res.json({ message: 'Se ha elimiado correctamente un producto. El producto eliminado es:', ID: idProd})
    });



export default router