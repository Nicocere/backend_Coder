const fs = require('fs')
const path = './Products.json'

class ProductManager{

// Crear Producto
async addProduct(producto){
    try {
        const productFile = await this.getProduct()
        productFile.push(producto)
        await fs.promises.writeFile(path, JSON.stringify(productFile))
    } catch(error){
        console.log("ERROR", error)
    }
}

async getProduct(){
    try{
        if(fs.existsSync(path)){
            const productoConsultado = await fs.promises.readFile(path, 'utf-8')
            const productoJS = JSON.parse(productoConsultado)
            // console.log("PRODUCTOS EN JSON", productoJS)
            return productoJS
        } else{
            return []
        }
    } catch (error){
        console.log(error)
    }
}



async getProductById(){
    try {

        if(fs.existsSync(path)){
             
            
            
            const productId = await fs.promises.readFile(path, 'utf-8')
           
            const productJSONId = JSON.parse(productId)
            console.log("PRODUCTOS EN JSON pero de ID", typeof productJSONId)
            
            // const thisId = 

            const {id} = productJSONId
            const getProductId =  productJSONId.find(prodId => prodId.id === id)
            console.log("id", id)

            console.log("esto es el ID  ", getProductId)
            
            // return productJSONId
        } else{
            return []
        }
        
    } catch (error) {
        console.log(error)
    }
}

}


const manager = new ProductManager()

async function ejecutarPrueba(){
    const getProduct = await manager.getProduct()
    console.log("get product", getProduct)

    const getProductById = await manager.getProductById()
    console.log("esto es el get product by id" , getProductById)

    //   await manager.crearUsuario(usuarioFranco)  
//   manager.updateUsuarios(1,{nombre:'Ernesto'})
}

ejecutarPrueba()

