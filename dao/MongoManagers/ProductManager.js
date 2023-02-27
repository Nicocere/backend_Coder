import { productsModel } from '../Models/product.model.js'

export default class ProductManager {

    //  ------------Traer todos los productos ------------
    async getProduct() {
        try {
            const prods = await productsModel.find({})
            // console.log("PRODUCTOS", prods)
            return prods
        } catch (error) {
            console.log(error)
        }
    };

    //     // ------------ Traer productos por ID   ------------
    async getProductById(idProd) {

        try {
            const productId = await productsModel.findById(idProd)
            // console.log("PROD POR ID", productId) 
                return productId    
        } catch (error) {
            console.log("ERROR no encuentra prod", error)
        }
    };

    //     //  ------------ AÑADIR Producto  ------------
        async addProduct(prodNuevo) {
            const newProd = await productsModel.create(prodNuevo);
            return newProd

        };

    //   // Manejador de archivos para actualizar un producto
    //   async updateProduct(productUpload) {
    //     try {
    //       const productFile = await this.getProduct()
    //       const getProdID = await this.getProductById(productUpload.id)

    //       if (getProdID) {
    //         getProdID.price = productUpload.price;
    //         getProdID.descr = productUpload.descr;
    //         getProdID.code = productUpload.code;
    //         getProdID.title = productUpload.title;
    //         getProdID.categoria = productUpload.categoria;
    //         getProdID.stock = productUpload.stock;
    //       }

    //       const updatedProductFile = productFile.map(product => {
    //         if (product.id === productUpload.id) {
    //           return getProdID;
    //         }
    //         return product;
    //       });

    //       await fs.promises.writeFile(path, JSON.stringify(updatedProductFile))
    //       return getProdID
    //     } catch (error) {
    //       console.log("ERROR", error)
    //     }
    //   };


    //     // ------------Eliminar todos los productos------------
        // async deleteAllProducts() {
        
        //     const deleteAll = await productsModel.deleteMany()
        //     // if (fs.existsSync(path)) {
        //     //     const emptyArray = await fs.promises.unlink(path)
        //     //     console.log("empty prods", emptyArray)
        //     //     return emptyArray
        //     // }
        // };

    //  // ------------- Eliminar producto -------------- 
     async deleteProduct(idProd) {
        try {

            const deleteProduct = await productsModel.findByIdAndDelete(idProd)
            return deleteProduct
            // const products = await this.getProduct();
            // const remainingProducts = products.filter(product => product.id !== idProd);
            // if (!fs.existsSync(path)) {
            //     fs.writeFileSync(path, '[]');
            // }
            // await fs.promises.writeFile(path, JSON.stringify(remainingProducts));
        } catch (error) {
            console.error(error);
        }
    }


}
