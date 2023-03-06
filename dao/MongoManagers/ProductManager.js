import { productsModel } from '../Models/product.model.js'

export default class ProductManager {

    //  ------------Traer todos los productos ------------
    async getProduct() {
        try {
            const prods = await productsModel.find({})
            return prods
        } catch (error) {
            console.log(error)
        }
    };

    //     // ------------ Traer productos por ID   ------------
    async getProductById(idProd) {

        try {
            const productId = await productsModel.findById({_id:idProd})
            console.log("PRODUCT ID", productId)
                return productId    
        } catch (error) {
            console.log("ERROR no encuentra prod", error)
        }
    };


    async aggregationFun() {
        try {
          const prod = await productsModel.aggregate([
            { $match: { title: { $gt: String } } },
            // {
            //   $group: {
            //     _id: '$genero',
            //     promedio: { $avg: '$calificacion' },
            //     sumCal: { $sum: '$calificacion' },
            //   },
            // },
            // {
            //   $sort: { promedio: -1 },
            // },
          ])
          console.log("prod", prod)
          return prod
        } catch (error) {
          console.log(error)
        }
      }

    //     //  ------------ AÑADIR Producto  ------------
        async addProduct(prodNuevo) {
            const newProd = await productsModel.create(prodNuevo);
            return newProd

        };

    //  // ------------- Eliminar producto -------------- 
     async deleteProduct(idProd) {
        try {

            const deleteProduct = await productsModel.findByIdAndDelete(idProd)
            return deleteProduct

        } catch (error) {
            console.error(error);
        }
    }


}
