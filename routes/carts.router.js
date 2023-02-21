import { Router } from "express";
import CartManager from "../Cart/CartManager.js";

const cartManager = new CartManager("Carrito.json", "Productos.json");

const router = Router();

// CREAR nuevo Carrito


router.post("/", async (req, res) => {
    try {
      const cart = req.body; // se espera que el cuerpo de la solicitud contenga el objeto para el nuevo carrito
      const newCart = await cartManager.newCart(cart);
  
      // Devolver el nuevo Carrito creado
      res.json({ message: "Se ha creado un nuevo Carrito de compras.", cart: newCart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "No se pudo crear el Carrito." });
    }
  });
  

// router.post("/", async (req, res) => {
//   try {
//     const cartList = await cartManager.getCart();
//     const lastId = cartList.length > 0 ? cartList[cartList.length - 1].id : -1;
//     const newId = lastId + 1;

//     let Carrito = {
//       id: newId,
//       products: [],
//     };

//     await cartManager.newCart(Carrito);

//     //   // Actualizar Carrito actual en sesión o cookies del usuario
//     //   req.session.cartId = newId;

//     // Devolver el nuevo Carrito creado
//     res.json({ message: "Se ha creado un nuevo Carrito de compras.", cart: Carrito });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "No se pudo crear el Carrito." });
//   }
// });

// todos los productos del Carrito
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  let cidNum = Number(cid);
  let carrito = await cartManager.getCartById(cidNum)
  console.log("carrito", carrito)
  if (!carrito) {
    return res.status(404).json({ message: "El Carrito no existe" });
  }else{
    
    res.json({ Carrito: carrito });
  }
 

})


// AGREGAR PROD NUEVO AL ARRAY PRODUCTO DEL Carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const cidNum = Number(cid);
  const pidNum = Number(pid);

  const quantity = req.body.quantity || 1;

  const carrito = await cartManager.getCartById(cidNum);

  if (!carrito) {
    return res.status(404).json({ message: "El Carrito no existe" });
  }

  const producto = await cartManager.getProductById(pidNum);
  if (!producto) {
    return res.status(404).json({ message: "El producto no existe" });
  }

  const productIndex = carrito.products.findIndex((p) => p.id === pidNum);

  if (productIndex >= 0) {
    carrito.products[productIndex].quantity += quantity;
  } else {
    carrito.products.push({ id: pidNum, quantity });
  }

  const updatedCart = await cartManager.updateCart(carrito);

  res.json(updatedCart.products);
});






// router.post("/:cid/product/:pid", async (req, res) => {
//     const { cid, pid } = req.params;

//     const cidNum = Number(cid)
//     const pidNum = Number(pid)

//     console.log("REQ.PARAMS", req.params)
  
//     const quantity = req.body.quantity || 1;
  
//     console.log("quantity", quantity)

//     const Carrito = await cartManager.getCartById(cidNum);

//     console.log("CARRITO  POST", Carrito)

//     if (!Carrito) {
//       return res.status(404).json({ message: "El Carrito no existe" });
//     }
  
//     const producto = await cartManager.getProductById(pidNum);
//     console.log("producto post", producto)
//     if (!producto) {
//       return res.status(404).json({ message: "El producto no existe" });
//     }
  
//     await cartManager.updateCart({ id: cidNum, products: [{ id: pidNum, quantity }] });
  
//     res.json(Carrito.products);
//   });
  

export default router;
