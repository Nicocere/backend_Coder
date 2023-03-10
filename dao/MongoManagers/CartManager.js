import { Cart } from '../Models/carts.model.js';


export default class CartManager {

  async newCart(cart) {
    try {

      const newCart = await Cart.create(cart);

      console.log("new ", newCart)
      console.log("new cart ID", newCart._id)
      return newCart

    } catch (error) {
      console.log(error);
    }
  }

  async getCart() {
    try {
      const getCart = await Cart.find();

      return getCart
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await Cart.findById(id);
      if (!cart) {
        throw new Error(`No se encontró el carrito con ID ${id}`);
      }
      console.log("cart", cart);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }


  async getProductById(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      const product = cart.products.id(productId);
      console.log("product", product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }


  async addProduct(cartId, product) {
    try {
      // Buscar el carrito por su id
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error("El Carrito no existe.");
      }
      // Agregar el producto al carrito
      cart.products.push(product);
      // Guardar los cambios en la base de datos
      const updatedCart = await cart.save();
      // Devolver el carrito actualizado
      return updatedCart;
    } catch (error) {
      console.log(error);
      throw new Error("No se pudo agregar el producto al Carrito.");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return null;
      }
      const product = cart.products.find((p) => p._id.equals(productId));
      if (!product) {
        return null;
      }
      product.quantity = quantity;
      await cart.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cart) {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(cart._id, cart, { new: true });
      console.log("updated cart", updatedCart);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCartProducts(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return null;
      }
      cart.products = products;
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCarts() {
    try {
      const result = await Cart.deleteMany();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts(id) {
    try {
      const cart = await Cart.findById(id);
      cart.products = [];
      const updatedCart = await cart.save();
      console.log("deleted all products", updatedCart);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      cart.products.id(productId).remove();
      const updatedCart = await cart.save();
      console.log("deleted product", updatedCart);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  }

}



