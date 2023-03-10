import { Router } from "express";
import ProductManager from '../dao/MongoManagers/ProductManager.js'
import { productsModel } from "../dao/Models/product.model.js";

const productManager = new ProductManager()
const router = Router();

// todos los productos
router.get('/', async (req, res) => {
    const prods = await productManager.getProduct()
    if (prods.length !== 0) {
        res.json({ prods })
    } else {
        res.send('No hay Productos en la Base de Datos')
    }
})

//PAGINACION MONGOOSE 
router.get('/pagination', async (req, res) => {

    // Limite de productos por página.
    const limit = req.query.limit || 3;

    // Opciones de paginación y búsqueda.
    const options = {
        page: req.query.page || 1,
        limit: limit,
        sort: {},
    };

    // Parámetros de búsqueda por codigo y query.
    const { status, title, descr } = req.query;
    const query = {};
    if (req.query.code) {
        query.code = { $regex: req.query.code, $options: 'i' };
    }
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };
    if (descr) query.descr = { $regex: descr, $options: 'i' };

    // Ordenamiento asc / desc
    if (req.query.sort) {
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        options.sort.price = sortOrder;
    }

    // Consulta y paginación de productos.
    const products = await productsModel.paginate(query, options);

    // Enlaces de página siguiente y anterior.
    const next = products.hasNextPage ? `http://localhost:8080/productos/pagination?page=${products.nextPage}` : null;
    const prev = products.hasPrevPage ? `http://localhost:8080/productos/pagination?page=${products.prevPage}` : null;

    res.status(200).json({
        info:
        {
            Curret_Page: products.page,
            Total_Pages: products.totalDocs,
            Limite: products.limit,
            Paginas: products.totalPages,
            Next: next,
            Prev: prev
        },
        results: products.docs
    })
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
    console.log("REq.params", idProd)
    const prodID = await productManager.getProductById(idProd)
    // console.log("PROD ID server", JSON.stringify(prodID))

    res.json({ prodID })
})


// Agreggation 
router.get('/aggregation', async (req, res) => {
    const prod = await productsModel.aggregationFun()

    res.json({ prod })
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

// Actualizar un producto

router.put('/upload/:idProd', async (req, res) => {
    try {
        // Obtener el ID del producto desde la ruta
        const { idProd } = req.params;
        // Validar que el ID es un número entero
        const id = parseInt(idProd);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'El ID proporcionado no es válido' });
        }

        // Obtener el nuevo producto desde la solicitud
        const newProduct = req.body;

        // Buscar el producto por su ID y actualizarlo
        const productUpload = await Product.findByIdAndUpdate(id, newProduct, { new: true });

        if (!productUpload) {
            return res.status(404).json({ message: 'No se encontró el producto con el ID proporcionado' });
        }

        // Devolver una respuesta de éxito con el producto actualizado
        res.json({ message: 'Producto actualizado exitosamente', product: productUpload });
    } catch (error) {
        console.error('No se pudo actualizar el producto', error);
        res.status(500).json({ message: 'No se pudo actualizar el producto' });
    }
});


// eliminar todos los productos

router.delete('/delete/all', async (req, res) => {
    try {
        // Eliminar todos los productos
        const result = await productManager.deleteMany({});
        const count = result.deletedCount;

        // Devolver una respuesta de éxito con la cantidad de productos eliminados
        res.json({ message: `${count} productos eliminados exitosamente` });
    } catch (error) {
        console.error('No se pudieron eliminar los productos', error);
        res.status(500).json({ message: 'No se pudieron eliminar los productos' });
    }
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


export default router