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
    console.log("prodNuevo SERVER ", prodNuevo)
    const addProd = await productManager.addProduct(prodNuevo)
    // console.log("ADD PROD", addProd)

    // res.json({ message: 'Producto creado exitosamente', addProd })
    // res.redirect('back')
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


// Ruta para actualizar un producto
router.put('/upload/:idProd', async (req, res) => {
    try {
    // Obtener el ID del producto desde la ruta
    let { idProd } = req.params
    // Validar que el ID es un número entero
    let id = parseInt(idProd)
    if (isNaN(id)) {
        return res.status(400).json({ message: 'El ID proporcionado no es válido' })
    }

    // Obtener el nuevo producto desde la solicitud
    let newProduct = req.body

    // Crear un objeto para actualizar con el ID y los datos del nuevo producto
    let productUpload = { id, ...newProduct }

    // Actualizar el producto a través del manejador de archivos
    const uploadProd = await productManager.updateProduct(productUpload)

    // Devolver una respuesta de éxito
    res.json({ message: 'Producto actualizado exitosamente', uploadProd })
} catch (error) {
    console.log('No se pudo actualizar el producto', error)
    res.status(500).json({ message: 'No se pudo actualizar el producto' })
}
})


// eliminar todos los productos
router.delete('/delete/all', async (req, res) => {
    await productManager.deleteAllProducts()
    res.send('Todos los productos fueron eliminados eliminados')
});


// Eliminar producto por ID
router.delete('/delete/:idProd', async (req, res) => {
    try {
        const { idProd } = req.params;
        console.log(req.body);
        console.log("ID del producto que se eliminará", idProd);
        await productManager.deleteProduct(parseInt(idProd));

        res.json({ message: `Se ha eliminado correctamente un producto con ID ${idProd}.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error al eliminar el producto." });
    }
});

// // eliminar producto por ID
// router.delete('/delete/:idProd', async (req, res) => {
//     const { idProd } = req.params
//     console.log(req.body)
//     console.log("ID del PROD que se eliminara", idProd)
//     await productManager.deleteProduct(parseInt(idProd))


//     res.json({ message: 'Se ha elimiado correctamente un producto. El producto eliminado es: ' + idProd })
//     });



export default router