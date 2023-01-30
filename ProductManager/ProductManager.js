import fs from 'fs'
import express from 'express'
const path = './ProductManager/Productos.json'

export default class ProductManager {


    //  ------------Traer todos los productos ------------
    async getProduct() {
        try {
            if (fs.existsSync(path)) {
                const productFile = await fs.promises.readFile(path, 'utf-8')
                const productoJS = JSON.parse(productFile)
                // console.log("PRODUCTOS EN JSON", productoJS)
                return productoJS
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    // ------------ Traer productos por ID   ------------
    async getProductById(idProd) {

        try {
            if (this.getProduct) {
                const productId = await this.getProduct()
                // console.log("product id", productId)
                // console.log("ID PROD", idProd)
                // console.log("prod id", prodId)
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
    async addProduct(prodNuevo) {

        const prodREad = await fs.promises.readFile(path, 'utf-8')
        console.log("prod read", prodREad)
        const productFile = JSON.parse(prodREad)
        console.log("PRODUCT FILE", productFile)
        console.log("Producto que llego como parametro", prodNuevo)

        let { id, title, price, img, producto, code, descr, categoria, stock } = prodNuevo
        id = productFile.length === 0 ? 1 : productFile[productFile.length - 1].id + 1

    
            const newProd = { id, ...prodNuevo }
            console.log("Nuevo producto con ID", newProd)

            
            let prodAdded = productFile.push({newProd})
            // await fs.promises.writeFile(this.path, JSON.stringify(productFile))
            
            console.log("nuevo objeto añadido:", prodAdded)
            
            return newProd
    }


    //  ------------ actualizar producto  ------------
    async updateProduct(newProduct) {
        try {
            // if (fs.existsSync(path)) {
            console.log("NEW PRODUCT  MANAGER ! :", newProduct)

            // console.log("ID product manager", idProd)
            const updateProductFile = await this.getProductById(parseInt(newProduct.idProd))


            console.log("UPDATE PRODUCT FILE MANAGER", updateProductFile)
            const newProdUpload = updateProductFile.push(newProduct)
            // await fs.promises.writeFile(path, JSON.stringify(updateProductFile))
            // } else {
            //     return []
            // }
        } catch (error) {
            console.log("ERROR", error)
        }
    }

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
        const products = await this.getProduct()
        const deleteID = products.filter(prod => prod.id !== idProd)
        // console.log("ID POR ELIMINAR", deleteID)
        //  await fs.promises.writeFile(this.path, JSON.stringify(deleteID))
    }

}

const manager = new ProductManager()

async function ejecutarPrueba() {

    // ---- TRAER PRODUCTOS ----
    const getProduct = await manager.getProduct()

    // // ---- TRAER PRODUCTO POR ID ----
    const getProductById = await manager.getProductById()

    // ----  CREAR PRODUCTO NUEVO -----

    // const addProduct = await manager.addProduct()
    //         {
    //     price: 510,
    //     producto: true,
    //     descr: 'Florero Rosas ',
    //     code: 'Florero',
    //     img: '../assets/imagenes/PRODUCTOS/Florero_rosas.jpg',       
    //     title: 'Florero',
    //     categoria: [ 'Rosas', 'Florero', 'Todos' ],
    //     stock: 100
    //         }
    //    

    // ---- MODIFICAR PRODUCTO ----

    // const updateProduct = await manager.updateProduct()
    // {
    // id: 3, 
    // price: 510,
    // producto: true,
    // descr: 'Florero Rosas ',
    // code: 'Florero',
    // img: '../assets/imagenes/PRODUCTOS/Florero_rosas.jpg',       
    // title: 'Florero',
    // categoria: [ 'Rosas', 'Florero', 'Todos' ],
    // stock: 100
    // })

    // ELIMINAR TODOS LOS PRODUCTOS
    const deleteAll = await manager.deleteAllProducts()

    // --- ELIMINAR PRODUCTO POR ID ----
    const productDeleted = await manager.deleteProduct()


}

ejecutarPrueba()


