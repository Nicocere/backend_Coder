import { Router } from "express";
import CartManager from "../dao/MongoManagers/CartManager.js";

const cartManager = new CartManager("Carrito.json", "Productos.json");

const router = Router();

// CREAR nuevo Carrito
router.post("/new", async (req, res) => {
  try {
    const cart = req.body;
    const newCart = await cartManager.newCart(cart);

    // Devolver el nuevo Carrito creado
    res.json({ message: "Se ha creado un nuevo Carrito de compras.", cart: newCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo crear el Carrito." });
  }
});

// Todos los Carritos
router.get("/all", async (req, res) => {
  try {
    const allCarts = await cartManager.getCart();
    const cartIds = allCarts.map(cart => cart._id);
    
    console.log("all cart IDs", cartIds);

    res.json({ Carts: allCarts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudieron obtener los carritos." });
  }
});


// Todos los Productos del Carrito encontrado por ID
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  // let cidNum = Number(cid);
  let carrito = await cartManager.getCartById(cid)
  console.log("carrito", carrito)
  if (!carrito) {
    return res.status(404).json({ message: "El Carrito no existe" });
  } else {
    res.json({ Carrito: carrito });
  }
})



// Agregar un producto a un Carrito
router.post("/:id/addProd/:pId", async (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const result = await cartManager.addProduct(id, product);
    res.json({ message: "Se ha agregado un nuevo producto al Carrito.", cart: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo agregar el producto al Carrito." });
  }
});

// Actualizar productos del Carrito
router.put("/:cid/productos", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body;
    const updatedCart = await cartManager.updateCartProducts(cid, products);
    if (!updatedCart) {
      return res.status(404).json({ error: "No se encontró el Carrito." });
    }
    res.json({ message: "Carrito actualizado.", cart: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Carrito." });
  }
});

// Actualizar la cantidad de un producto en el Carrito
router.put("/:cid/productos/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const updatedProduct = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (!updatedProduct) {
      return res.status(404).json({ error: "No se encontró el producto en el Carrito." });
    }
    res.json({ message: "Cantidad del producto actualizada.", product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar la cantidad del producto en el Carrito." });
  }
});

// Actualizar un Carrito
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cart = req.body;
    const updatedCart = await cartManager.updateCart(id, cart);
    if (!updatedCart) {
      return res.status(404).json({ error: "No se encontró el Carrito." });
    }
    res.json({ message: "Carrito actualizado.", cart: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo actualizar el Carrito." });
  }
});


// Eliminar todos los Carritos
router.delete("/allcarts", async (req, res) => {
  try {
    const result = await cartManager.deleteAllCarts();
    res.json({ message: "Se han eliminado todos los Carritos.", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudieron eliminar los Carritos." });
  }
});


// Eliminar un Carrito por ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCart = await cartManager.deleteCart(id);
    if (!deletedCart) {
      return res.status(404).json({ error: "No se encontró el Carrito." });
    }
    res.json({ message: "Carrito eliminado.", cart: deletedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo eliminar el Carrito." });
  }
});

// Eliminar todos los productos del Carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartManager.deleteAllProducts(cid);
    if (!deletedCart) {
      return res.status(404).json({ error: "No se encontró el Carrito." });
    }
    res.json({ message: "Todos los productos del Carrito han sido eliminados.", cart: deletedCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudieron eliminar los productos del Carrito." });
  }
});

// Eliminar un producto del Carrito
router.delete("/:cid/productos/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const deletedProduct = await cartManager.deleteProduct(cid, pid);
    if (!deletedProduct) {
      return res.status(404).json({ error: "No se encontró el producto en el carrito." });
    }
    res.json({ message: "Producto eliminado del carrito.", product: deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo eliminar el producto del carrito." });
  }
});


export default router;
