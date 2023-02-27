import { Router } from "express";
import MessageManager from "../dao/MongoManagers/MessageManager";

const messageManager = new MessageManager();

const router = Router();

// CREAR nuevo Carrito
router.post("/", async (req, res) => {
  try {
    const message = req.body;
    const newCart = await messageManager.newMessage(cart);

//     // Devolver el nuevo Carrito creado
//     res.json({ message: "Se ha creado un nuevo Carrito de compras.", cart: newCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "No se pudo crear el mensaje." });
  }
});
