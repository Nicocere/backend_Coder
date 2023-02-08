import fs from 'fs'
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
    };

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
    };

    //  ------------ AÑADIR Producto  ------------
    async addProduct(prodNuevo) {

        const productFile = await this.getProduct()

        console.log("PRODUCT FILE", productFile)
        console.log("prodNuevo ProductManager", prodNuevo)
        
        let { id, title, price, img, producto, code, descr, categoria, stock } = prodNuevo
        
        id = productFile.length === 0 ? 1 : productFile[productFile.length - 1].id + 1


        const newProd = { id, ...prodNuevo }
        // console.log("new prod", newProd)
        let prodAdded = productFile.push(newProd)
        await fs.promises.writeFile(path, JSON.stringify(productFile))
        console.log("prod added", prodAdded)

   
        return newProd

    };


    //  ------------ actualizar producto  ------------
    async updateProduct(productUpload) {
        try {
            const productFile = await this.getProduct()
                console.log("productUpload PARAMETRO  MANAGER ! :", productUpload)
                
                const getProdID = await this.getProductById(productUpload.id)
                
                

          
                if(getProdID.id === productUpload.id){
                    
                    getProdID.price = productUpload.price;
                    getProdID.descr = productUpload.descr;
                    getProdID.code = productUpload.code;
                    getProdID.title = productUpload.title;
                    getProdID.categoria = productUpload.categoria;
                    getProdID.stock = productUpload.stock
                    
                }
                
                console.log("GET PRODUCT ID AWAIT MANAGER", getProdID)
                // await fs.promises.writeFile(path, JSON.stringify(getProdID))
                return getProdID
       
        } catch (error) {
            console.log("ERROR", error)
        }
    };

    // ------------eliminar todos los productos------------
    async deleteAllProducts() {
        if (fs.existsSync(path)) {
            const emptyArray = await fs.promises.unlink(path)
            console.log("empty prods", emptyArray)
            return emptyArray
        }
    };

    //  ------------ eliminar producto ------------
    async deleteProduct(idProd) {


        const products = await this.getProduct()
        const deleteID = products.filter(prod => prod.id !== idProd)
        // console.log("ID POR ELIMINAR", deleteID)
        // await fs.promises.writeFile(path, JSON.stringify(deleteID))
    };

}
