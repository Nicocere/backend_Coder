import { Router } from "express";
import fs from 'fs'
const router = Router()
const path = './Products/Productos.json'
import ProductManager from '../dao/MongoManagers/ProductManager.js'
const productManager = new ProductManager()



router.get('/', async (req, res) => {

//con mongo
    // const prods = await productManager.getProduct()

    
//con fs 
    let productJSON = await fs.promises.readFile(path, 'utf-8')
    let prods = JSON.parse(productJSON)
    res.render('index',  {prods} )
})

router.get('/realtimeproducts', async (req, res) => {

//con mongo
    const products = await productManager.addProduct()

//con fs
    // let productJSON = await fs.promises.readFile(path, 'utf-8')
    // let products = JSON.parse(productJSON)
    res.render('realTimeProducts', { products })

})


export default router