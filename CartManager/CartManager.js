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

    };



    // ------------eliminar todos los productos------------
    async deleteAllProducts() {
        if (fs.existsSync(this.path)) {
            const emptyArray = await fs.promises.unlink(this.path)
            console.log("empty prods", emptyArray)
            return emptyArray
        }
    }

    //  ------------ eliminar producto ------------
    async deleteProduct(idProd) {


        // // const products = await this.getProduct()
        // const deleteID = products.filter(prod => prod.id !== idProd)
        // console.log("ID POR ELIMINAR", deleteID)
        // await fs.promises.writeFile(path, JSON.stringify(deleteID))

    }

}

// const manager = new CartManager()

// async function ejecutarPrueba() {

//     // ----  CREAR PRODUCTO NUEVO -----

//     // const addProduct = await manager.addProduct() 


//     // // ---- TRAER PRODUCTOS ----
//     // // // const getProduct = await manager.getProduct()

//     // // // ---- TRAER PRODUCTO POR ID ----
//     // const getProductById = await manager.getProductById()


//     // ---- MODIFICAR PRODUCTO ----

//     // const updateProduct = await manager.updateProduct()


//     // ELIMINAR TODOS LOS PRODUCTOS
//     // const deleteAll = await manager.deleteAllProducts()

//     // --- ELIMINAR PRODUCTO POR ID ----
//     const productDeleted = await manager.deleteProduct()


// }

// ejecutarPrueba()


