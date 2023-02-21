import fs from "fs/promises";

const cartPath = './Cart/Carrito.json';
const productsPath = './ProductManager/Productos.json'

export default class CartManager {

  async newCart(cart) {
    try {
      const cartFile = await fs.readFile(cartPath, "utf-8");
      let cartList = JSON.parse(cartFile);

      console.log("cart list", cartList)
      const lastId = cartList.length > 0 ? cartList[cartList.length - 1].id : -1;
      const newId = lastId + 1;

      const newCart = {
        id: newId,
        products: [],
        ...cart,
      };
      if (!Array.isArray(cartList)) {
        cartList = [];
      }

      cartList.push(newCart);

      await fs.writeFile(cartPath, JSON.stringify(cartList));

      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCart() {
    try {
      const cartFile = await fs.readFile(cartPath, "utf-8");
      const cart = JSON.parse(cartFile);

      console.log("cart", cart);

      let cartArray = Object.values(cart);
      console.log("cartARRAY,", cartArray)

      const cartId = cartArray.find((c) => c.id === cartArray.id);
      console.log("cart id", cartId);
      return cartId;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    console.log("ID", id);
    try {
      const cartFile = await fs.readFile(cartPath, "utf-8");
      const cart = JSON.parse(cartFile);

      let cartArray = Object.values(cart);

      const cartObj = cartArray.find((c) => c.id === id);
      console.log("cart get CART by ID", cartObj);
      return cartObj;
    } catch (error) {
      console.log(error);
    }
  }


  async getProductById(id) {
    const productsFile = await fs.readFile(productsPath, "utf-8");
    const products = JSON.parse(productsFile);
    const findProd = products.find((p) => p.id.toString() === id.toString());
    console.log("findProd", findProd);
    return findProd
  }


  async updateCart(cart) {
    try {
      const cartFile = await fs.readFile(cartPath, "utf-8");
      const cartList = JSON.parse(cartFile);

      const index = cartList.findIndex((c) => c.id === cart.id);
      if (index >= 0) {
        cartList[index].products = cart.products;
        await fs.writeFile(cartPath, JSON.stringify(cartList));
        return cartList[index];
      }
    } catch (error) {
      console.log(error);
    }
  }

}
