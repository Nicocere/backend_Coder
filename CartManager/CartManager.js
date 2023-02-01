import fs from 'fs'
import express from 'express'
const path = './CartManager/CartProducts.json'




export default class CartManager {


    //  ------------ CREAR NUEVO CARRITO  ------------
    async newCart(carrito) {

        await fs.promises.writeFile(path, JSON.stringify(carrito))

    };

    //  ------------Traer todos los productos ------------
    async getCart() {
        try {
            if (fs.existsSync(path)) {
                const cartFile = await fs.promises.readFile(path, 'utf-8')
                const cartFileJS = JSON.parse(cartFile)
                console.log("cartFile EN JSON", cartFileJS)
                return cartFileJS
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    };


    // ------------ Traer productos por ID   ------------
    async getProductById(idProd) {

        try {
            if (this.getCart) {
                const productId = await this.getCart()

                let prodId = productId.find((prod) => prod.id === idProd)

                return prodId
            } else {
                throw new Error("No existe producto")
            }
        } catch (error) {
            console.log("ERROR no encuentra prod", error)
        }
    }



    //  ------------ AÑADIR Producto  ------------
    async addProduct(carrito) {

        const cartFile = await this.getCart()

        console.log("CART FILEEEEEE ",  cartFile[carrito.id].productos)
        console.log("carrito cart.manger ", carrito.id)

        cartFile[carrito.id].productos = carrito.idProd

        console.log("PRODUCTOS DEL CARRITO",carrito.idProd)

        carrito.id = cartFile.length === 0 ? 1 : cartFile[cartFile.length - 1].id + 1

        // console.log("id  cart.manger ", carrito)

        // await fs.promises.writeFile(path, JSON.stringify(carrito))

        // return newProduct

    }

}