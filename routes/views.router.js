import { Router } from "express";
import fs from 'fs'
import ProductManager from '../dao/MongoManagers/ProductManager.js'
// import 

const router = Router()
const path = './Products/Productos.json'
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

router.get('/chat', async (req, res)=>{
    res.render('chat',)
})



export default router